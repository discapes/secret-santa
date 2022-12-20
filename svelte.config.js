import preprocess from "svelte-preprocess";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    replace: [
      [/__NAMES__/g, JSON.stringify(process.env.NAMES)],
      [/__SEED__/g, JSON.stringify(process.env.SEED)],
      [/__LOG_RESULT__/g, JSON.stringify(process.env.LOG_RESULT)],
    ],
  }),
};
