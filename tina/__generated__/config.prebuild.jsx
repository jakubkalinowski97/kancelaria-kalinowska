// tina/config.ts
import { defineConfig } from "tinacms";
var branch = "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Artyku\u0142y",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytu\u0142",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Opis",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Obraz wyr\xF3\u017Cniaj\u0105cy",
            required: true
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Alternatywny tekst obrazu",
            required: true
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Data publikacji",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Kategoria",
            required: true,
            options: [
              "Prawo Cywilne",
              "Prawo Karne",
              "Prawo Rodzinne",
              "Prawo Gospodarcze",
              "Prawo Pracy",
              "Ochrona Praw Zwierz\u0105t",
              "Porady Prawne"
            ]
          },
          {
            type: "string",
            name: "tags",
            label: "Tagi",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Tre\u015B\u0107",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
