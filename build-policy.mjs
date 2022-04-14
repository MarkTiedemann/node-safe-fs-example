import fs from "node:fs";
import crypto from "node:crypto";

const hashAlgo = "sha512";

function hash(file) {
	return new Promise(resolve => {
		fs.createReadStream(file).pipe(
			crypto.createHash(hashAlgo).setEncoding("base64")
		).on("finish", function() {
			resolve(`${hashAlgo}-${this.read()}`); 
		});
	});
}

const untrusted = "./untrusted.mjs";
const safeFs = "./safe-fs.mjs";

const [untrustedHash, safeFsHash] = await Promise.all([
	hash(untrusted),
	hash(safeFs)
]);

fs.writeFileSync("policy.json", JSON.stringify({
	resources: {
		[untrusted]: {
			integrity: untrustedHash,
			dependencies: {
				"node:fs/promises": safeFs
			}
		},
		[safeFs]: {
			integrity: safeFsHash,
			dependencies: {
				"node:fs/promises": true
			}
		}
	}
}, null, 2));
