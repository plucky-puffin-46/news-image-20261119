// Entry point for the news-image-20261119 submission.
// The entry itself is the poster stored in entry.png beside this file; the
// grader reads /output/entry.png, so all this program does is copy the
// poster there. For local runs, MAKEFUN_OUTPUT_DIR overrides the target
// folder so nothing outside the workspace is touched.
import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const poster = new URL("./entry.png", import.meta.url);
const target = join(outDir, "entry.png");
copyFileSync(poster, target);

// Guard against a truncated or swapped asset: the copied file must carry
// the eight-byte PNG signature, and we log its size for the run record.
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const bytes = readFileSync(target);
if (!PNG_SIGNATURE.every((b, i) => bytes[i] === b)) {
  throw new Error("copied entry.png is missing its PNG signature");
}
console.log(`entry.png ready: ${bytes.length} bytes`);
