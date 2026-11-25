// make.fun entry — Last Out of Office: The AI That Went Barista
// Writes one original out-of-office auto-reply to /output/entry.txt.
// Gate: UTF-8 text, 1-280 characters, not whitespace only.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "This inbox is no longer monitored. I traded 175 billion parameters for one apron and a name tag that says TRAINEE. Your email is important to me, which is why I printed it out and now use it as a coaster.";

if (ENTRY.length < 1 || ENTRY.length > 280 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-280 gate`);
}

// Byte gate: the 280-char limit is measured on the submitted text, and a
// multi-byte character could push the byte count past the char count, so
// enforce the same ceiling in bytes as well.
if (Buffer.byteLength(ENTRY, "utf8") > 280) {
  throw new Error(`entry is ${Buffer.byteLength(ENTRY, "utf8")} bytes, over the 280-byte ceiling`);
}

// The brief wants a single line: reject any newline that would split it.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
