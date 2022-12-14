import preprocess from "svelte-preprocess";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    replace: [
      [/__NAMES__/, JSON.stringify(process.env.NAMES)],
      [/__SEED__/, JSON.stringify(process.env.SEED)],
    ],
  }),
};
