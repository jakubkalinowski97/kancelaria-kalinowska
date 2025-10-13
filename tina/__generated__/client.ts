import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'fa764a5b3bf1c97126c95128a4ce1fef962b6653', queries,  });
export default client;
  