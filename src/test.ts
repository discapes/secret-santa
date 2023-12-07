const log = false;
import "dotenv/config";
import { calculate } from "./lib";

const result = calculate(process.env.NAMES, process.env.SEED);

console.log(result);
