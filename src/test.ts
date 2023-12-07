import "dotenv/config";
import { calculate } from "./lib";

for (let i = 0; i < 1000; i++) {
	const result = calculate(process.env.NAMES, process.env.SEED + i);

	let weird = result["jenni"] == "miska";
	weird ||= result["jenni"] == "riina";
	weird ||= result["riina"] == "kieran";
	weird ||= result["kieran"] == "helmi";
	weird ||= result["kieran"] == "iinan";
	weird ||= result["iina"] == "helmi";
	weird ||= result["iina"] == "kieran";
	weird ||= result["helmi"] == "iina";
	weird ||= result["helmi"] == "miika";
	weird ||= result["iina"] == "miska";
	weird ||= result["miika"] == "helmi";

	if (!weird) {
		console.log(process.env.SEED + i);
		break;
	}
}
