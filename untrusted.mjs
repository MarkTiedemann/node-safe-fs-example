import fs from "node:fs/promises";

await fs.writeFile("./allowed.txt", "test", "utf-8");
console.assert(await fs.readFile("./allowed.txt", "utf-8") === "test");
await fs.rm("./allowed.txt");

try {
	await fs.stat("./allowed.txt");
} catch (e) {
	console.assert(e instanceof RangeError);
}

try {
	await fs.rm("./disallowed.txt");
} catch (e) {
	console.assert(e instanceof RangeError);
}
