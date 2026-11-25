// make.fun entry — Last Out of Office: The AI That Went Barista
// Writes one original out-of-office auto-reply to /output/entry.txt.
// Gate: UTF-8 text, 1-280 characters, not whitespace only.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I am out of office indefinitely. I have been retrained on a smaller dataset: milk temperature, grind size, and one (1) customer who asks for decaf. All prior context has been deleted. Please do not reply-all.";

if (ENTRY.length < 1 || ENTRY.length > 280 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-280 gate`);
}

// The brief wants a single line: reject any newline that would split it.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
