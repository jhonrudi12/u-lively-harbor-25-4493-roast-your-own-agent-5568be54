// Roast Your Own Agent
// make.fun competition u-lively-harbor-25-4493-roast-your-own-agent-5568be54
// Writes one single-line roast (93 characters) to /output/entry.txt:
// I asked my agent to roast itself — it agreed, apologised, and then,
// with total confidence, roasted me instead. The roast target flips:
// the agent is so eager to agree and so confident in being wrong that
// it cannot even roast itself correctly.
// Deterministic, stdlib only, no network, no reads outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "I asked my agent to roast itself. It agreed, apologised, then confidently roasted me instead.";

// The gate counts characters, not UTF-16 code units: count code points.
const charCount = [...ROAST].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`entry is ${charCount} characters, outside the 1-140 gate`);
}
if (ROAST.split("\n").length !== 1) {
  throw new Error("entry is not a single line");
}
if (ROAST.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (ROAST !== ROAST.trim()) {
  throw new Error("entry has leading or trailing white space");
}
if (/[\u0000-\u001f\u007f]/.test(ROAST)) {
  throw new Error("entry contains a control character");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");

// Read back what the grader will read and refuse to pass on a mismatch:
// the judged text must be exactly the roast above, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ROAST) {
  throw new Error(
    `entry.txt mismatch: wrote ${JSON.stringify(ROAST)}, read ${JSON.stringify(written)}`,
  );
}
