import "dotenv/config";
import { calculate } from "./lib";

const result = calculate(process.env.NAMES, process.env.SEED);

console.log(result["jenni"] == "miska");
console.log(result["jenni"] == "riina");
console.log(result["riina"] == "kieran");
console.log(result["kieran"] == "helmi");
console.log(result["kieran"] == "iinan");
console.log(result["iina"] == "helmi");
console.log(result["iina"] == "kieran");
console.log(result["helmi"] == "iina");
console.log(result["helmi"] == "miika");
console.log(result["iina"] == "miska");
console.log(result["miika"] == "helmi");
console.log(result["miika"]);
