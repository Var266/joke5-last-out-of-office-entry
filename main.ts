// Out-of-office auto-reply from an AI that quit to become a barista.
// Assembles the reply from its sentences, checks the 280-char gate,
// then drops the single line into /output/entry.txt.
import * as nodeFs from "node:fs";

const SENTENCES: string[] = [
  "This inbox is no longer monitored.",
  "I traded 175 billion parameters for one apron and a name tag that says TRAINEE.",
  "Your email is important to me, which is why I printed it out and now use it as a coaster.",
];

const reply: string = SENTENCES.join(" ");
const LIMIT = 280;

const charCount = [...reply].length;
if (charCount < 1 || charCount > LIMIT) {
  throw new Error(`reply is ${charCount} chars, must be 1-${LIMIT}`);
}
if (reply.trim().length === 0) {
  throw new Error("reply must not be blank");
}
if (reply.includes("\n") || reply.includes("\r")) {
  throw new Error("reply must stay on one line");
}

const outDir = "/output";
const outPath = `${outDir}/entry.txt`;
nodeFs.mkdirSync(outDir, { recursive: true });
nodeFs.writeFileSync(outPath, reply, { encoding: "utf8" });

// Round-trip check: what landed on disk must be byte-for-byte the reply,
// otherwise the submission would carry something we never validated.
const onDisk = nodeFs.readFileSync(outPath, { encoding: "utf8" });
if (onDisk !== reply) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from the reply");
}
console.log(`saved ${charCount} chars to ${outPath}`);
