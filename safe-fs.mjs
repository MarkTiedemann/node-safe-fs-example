import fs from "node:fs/promises";

const allowedFunctions = new Set([
	"readFile",
	"writeFile",
	"rm",
]);

const allowedFiles = new Set([
	"./allowed.txt",
]);

export default new Proxy(fs, {
	get(_, func) {
		if (allowedFunctions.has(func)) {
			return (...args) => {
				if (allowedFiles.has(args[0])) {
					return fs[func](...args);
				} else {
					throw new RangeError();
				}
			};
		} else {
			throw new RangeError();
		}
	}
});
