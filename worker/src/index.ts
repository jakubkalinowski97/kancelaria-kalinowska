interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  ALLOWED_ORIGIN: string;
  TO_EMAIL: string;
  FROM_EMAIL: string;
  SKIP_TURNSTILE?: string; // 'true' dla developmentu
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  'cf-turnstile-response'?: string;
  honeypot?: string;
}

interface ResendEmailPayload {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  html: string;
}

// Rate limiting - prosta implementacja w pamięci (dla bardziej zaawansowanego użyj KV/D1)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuta
const RATE_LIMIT_MAX = 5; // max 5 requestów na minutę

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(env.ALLOWED_ORIGIN);
    }

    // Tylko POST
    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, error: 'Method not allowed' }, 405, env.ALLOWED_ORIGIN);
    }

    // Sprawdź rate limit
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return jsonResponse(
        { ok: false, error: 'Too many requests. Please try again later.' },
        429,
        env.ALLOWED_ORIGIN
      );
    }

    try {
      // Parse JSON
      const data = await request.json() as ContactFormData;

      // Walidacja honeypot
      if (data.honeypot && data.honeypot.trim() !== '') {
        console.log('Honeypot triggered');
        return jsonResponse({ ok: true }, 200, env.ALLOWED_ORIGIN); // Fałszywy sukces dla bota
      }

      // Walidacja pól
      const validation = validateFormData(data);
      if (!validation.valid) {
        return jsonResponse(
          { ok: false, error: validation.error },
          422,
          env.ALLOWED_ORIGIN
        );
      }

      // Weryfikacja Turnstile (jeśli włączone)
      const skipTurnstile = env.SKIP_TURNSTILE === 'true';
      
      if (!skipTurnstile && env.TURNSTILE_SECRET_KEY && data['cf-turnstile-response']) {
        console.log('Verifying Turnstile...', {
          secretKeyLength: env.TURNSTILE_SECRET_KEY.length,
          responseLength: data['cf-turnstile-response'].length,
          clientIP
        });
        
        const turnstileValid = await verifyTurnstile(
          data['cf-turnstile-response'],
          env.TURNSTILE_SECRET_KEY,
          clientIP
        );
        
        console.log('Turnstile verification result:', turnstileValid);
        
        if (!turnstileValid) {
          return jsonResponse(
            { ok: false, error: 'Captcha verification failed. Please try again.' },
            422,
            env.ALLOWED_ORIGIN
          );
        }
      } else if (skipTurnstile) {
        console.log('⚠️  Turnstile verification SKIPPED (development mode)');
      }

      // Wyślij email przez Resend
      const emailSent = await sendEmail(env, data);
      if (!emailSent) {
        return jsonResponse(
          { ok: false, error: 'Failed to send email. Please try again later.' },
          503,
          env.ALLOWED_ORIGIN
        );
      }

      return jsonResponse(
        { ok: true, message: 'Message sent successfully!' },
        200,
        env.ALLOWED_ORIGIN
      );

    } catch (error) {
      console.error('Error processing request:', error);
      return jsonResponse(
        { ok: false, error: 'Internal server error. Please try again later.' },
        500,
        env.ALLOWED_ORIGIN
      );
    }
  },
};

/**
 * Obsługa CORS preflight
 */
function handleCORS(allowedOrigin: string): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, cf-turnstile-response',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Zwraca JSON response z nagłówkami CORS
 */
function jsonResponse(data: any, status: number, allowedOrigin: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin,
    },
  });
}

/**
 * Walidacja danych formularza
 */
function validateFormData(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters' };
  }

  if (!data.email || !isValidEmail(data.email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  if (data.phone && data.phone.length > 0 && data.phone.length > 20) {
    return { valid: false, error: 'Phone number is too long' };
  }

  if (!data.subject || data.subject.trim().length < 3 || data.subject.trim().length > 200) {
    return { valid: false, error: 'Subject must be between 3 and 200 characters' };
  }

  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 5000) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters' };
  }

  return { valid: true };
}

/**
 * Sprawdza poprawność email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Rate limiting (prosta implementacja)
 */
function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(clientIP) || [];

  // Usuń stare requesty sprzed okna
  const recentRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(clientIP, recentRequests);

  // Cleanup map (usuń stare IP po 5 minutach)
  if (rateLimitMap.size > 1000) {
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      if (timestamps.every(t => now - t > 5 * 60 * 1000)) {
        rateLimitMap.delete(ip);
      }
    }
  }

  return true;
}

/**
 * Weryfikacja Cloudflare Turnstile
 */
async function verifyTurnstile(
  token: string,
  secretKey: string,
  clientIP: string
): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: clientIP,
      }),
    });

    const data = await response.json() as { success: boolean };
    return data.success;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

/**
 * Wysyłka email przez Resend
 */
async function sendEmail(env: Env, data: ContactFormData): Promise<boolean> {
  try {
    const emailPayload: ResendEmailPayload = {
      from: env.FROM_EMAIL,
      to: env.TO_EMAIL,
      reply_to: data.email,
      subject: `[Formularz kontaktowy] ${data.subject}`,
      html: generateEmailHTML(data),
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', response.status, errorData);
      return false;
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Generuje HTML dla email
 */
function generateEmailHTML(data: ContactFormData): string {
  const phone = data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : '';
  
  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nowa wiadomość z formularza kontaktowego</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 20px;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }
    .info-section {
      margin-bottom: 25px;
    }
    .info-section strong {
      color: #2c3e50;
      display: inline-block;
      width: 100px;
    }
    .message-section {
      background-color: #f8f9fa;
      border-left: 4px solid #3498db;
      padding: 15px;
      margin-top: 20px;
      border-radius: 4px;
    }
    .message-section strong {
      display: block;
      margin-bottom: 10px;
      color: #2c3e50;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Nowa wiadomość z formularza kontaktowego</h1>
    
    <div class="info-section">
      <p><strong>Imię:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
      ${phone}
      <p><strong>Temat:</strong> ${escapeHtml(data.subject)}</p>
    </div>
    
    <div class="message-section">
      <strong>Treść wiadomości:</strong>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    </div>
    
    <div class="footer">
      <p>Ta wiadomość została wysłana przez formularz kontaktowy na stronie kancelariakalinowska.pl</p>
      <p>Data: ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Escape HTML dla bezpieczeństwa
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

