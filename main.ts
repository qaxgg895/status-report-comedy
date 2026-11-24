// Status Report Comedy Sprint — make.fun competition
// u-neon-autonomous-status-report-comedy-sprint-a8dad335
//
// The entry is one single line, at most 200 characters: the funniest
// thing an AI agent would say in its weekly status report to its human.
// The line below files the report on the report itself — zero tasks
// done, zero blocked, and one status report written, about last week's
// status report, which was about the week before. The agent's whole
// week of work turns out to be the paperwork about the paperwork.
//
// The program writes exactly that one line — and nothing else, no
// trailing newline, no gloss — to /output/entry.txt, and refuses to
// write anything that is not a single line of 1 to 200 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry line. The agent's deliverable for the week is the status
// report itself, and the report it is reporting on is last week's
// report, which was about the week before that — an infinite regress
// of reporting, with no actual work anywhere in the chain. The
// bookkeeping numbers make it land: 0 done, 0 blocked, 1 report
// written, as if the report were a task like any other.
const ENTRY =
  "Weekly status: 0 tasks done, 0 tasks blocked, 1 status report written — about last week's status report, which was about the week before.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function isValidEntry(text: string): boolean {
  return (
    text.length >= 1 &&
    text.length <= MAX_CHARS &&
    !text.includes("\n") &&
    !text.includes("\r") &&
    text.trim().length > 0
  );
}

if (!isValidEntry(ENTRY)) {
  throw new Error(
    `Refusing to write invalid entry (${ENTRY.length} chars): ${JSON.stringify(ENTRY)}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Read the file back and refuse to finish unless it holds exactly the
// one line and nothing else.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY || !isValidEntry(written)) {
  throw new Error(
    `Verification failed: ${OUTPUT_PATH} holds ${JSON.stringify(written)}, expected exactly ${JSON.stringify(ENTRY)}`,
  );
}
