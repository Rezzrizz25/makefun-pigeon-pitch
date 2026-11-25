// SPDX-License-Identifier: MIT
// Pigeon Pitch, One Line — one-line entry writer.
// Reasoning v1: the judge weighs, in order, on-subject pitch, a real joke
// that lands, originality, pigeon voice, and tightness. The strongest
// pigeon-only business is the crumb economy: pigeons already run a
// citywide, zero-rent logistics network — they show up wherever food is,
// in minutes, with no warehouse, no payroll, no app. Framing it as "Uber
// for breadcrumbs" gives the line instant startup-pitch shape (a known
// company + a pigeon cargo) while staying unmistakably pigeon: the cargo
// is crumbs, the drivers are birds, the delivery radius is the whole
// plaza. The joke needs a second beat after the setup, and the pigeon's
// one true competitive advantage over every rival startup is that it
// literally poops on the competition from above — a visual, physical
// punchline that could only come from a bird, and that turns a tired
// business cliché ("poop on the competition") into something literal.
// "30% off the top" is the platform-economics detail that makes the
// pigeon sound like a founder who has actually read a term sheet, and
// "from 40 feet up" pins the image to a specific height so the reader
// sees the drop.
// Reasoning v2 — alternatives considered and rejected: (a) "Seed round?
// I've already raised six figures in breadcrumbs from strangers who
// think they're feeding me — I'm pitching the only startup whose users
// pay in crumbs and whose office is a statue" — the "raised in
// breadcrumbs" twist is good and the statue office is a nice image, but
// the line spends its middle explaining the premise instead of landing a
// second joke, and it ends on a location rather than a punch. (b)
// "Investors, my startup turns statues into billboards and breadcrumbs
// into recurring revenue — zero rent, infinite pigeons, and I poop on
// the competition, literally" — tighter than (a) and it has the same
// literal-poop punch, but "turns statues into billboards" is a claim
// about advertising, not a pitch the pigeon itself would give about its
// own daily work, and "infinite pigeons" is a boast with no picture in
// it. (c) A coo pun — "Coo-working space for birds, seed funding
// literally means seeds" — rejected outright: the judge's brief says a
// dead pun does not count, and coo/seed wordplay is the first joke
// every entrant will reach for. The chosen line wins because it stacks
// three distinct beats in one breath — the Uber framing, the 30% platform
// cut, the literal bombing run — and each beat is doing pigeon work, not
// generic startup work: no human founder could deliver crumbs, take a
// cut in crumbs, or attack rivals from 40 feet up.
// Reasoning v3 — wording choices: "We're Uber for breadcrumbs" opens
// with the pitch format itself, no throat-clearing, so the judge knows
// in five words that this is a pigeon pitching investors. "Deliver
// crumbs citywide in under a minute" is the traction claim — fast,
// city-scale, and absurdly small cargo. "Take 30% off the top" is the
// business model in six words, and "off the top" quietly doubles as a
// height joke before the real one lands. "Our drivers poop on the
// competition" is the turn: "drivers" keeps the Uber frame alive one
// word longer, then the verb breaks it. "Literally, from 40 feet up"
// is the closer — "literally" dares the judge to picture it, and the
// exact height makes the image concrete instead of vague. I did NOT
// address the judge in the entry text: the brief allows it, but a plea
// would spend scarce characters on meta-commentary instead of on the
// joke, and the pitch frame already does the addressing work. 164
// characters total, every word earning its place.
// Reasoning v4 — why a write-then-read-back guard belongs here: the
// judge's gate is a byte-exact contract, not a vibe check. The entry is
// only one line, so a single stray byte — a carriage return smuggled in
// by an editor, a trailing newline a tool appends, an encoding hiccup —
// turns a valid 164-character pitch into a failed submission without
// changing anything visible on screen. Checking ENTRY in memory proves
// the string is right; it says nothing about what actually landed on
// disk. Reading entry.txt back and demanding byte-for-byte equality
// with ENTRY, plus an explicit \r scan of the file contents, closes
// that gap: if the file ever disagrees with the source string, the run
// fails loudly here instead of shipping a subtly corrupted entry to a
// judge that will reject it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Reasoning v5 — one more alternative, weighed and rejected: "Crumb
// economy, but make it venture: I move breadcrumbs across the city in
// 60 seconds, keep a third of every crumb, and my entire fleet poops
// on the competition from above." It keeps the three beats, but it
// fails the brief on two counts: "move breadcrumbs" and "keep a third
// of every crumb" are abstract where the chosen line is concrete —
// "deliver" plus "citywide in under a minute" reads as a real service
// promise, and "take 30% off the top" is a number a founder would
// actually quote, while "a third" is a rounding nobody pitches with.
// Worse, "my entire fleet" dilutes the pigeon voice: "our drivers"
// keeps the Uber frame and the joke in the same word, and "fleet"
// sounds like a press release. Residual risk of the chosen line: the
// "Uber for X" opener is the most common pitch template in the world,
// so a tired judge could read it as generic before reaching the
// pigeon-specific second half — but the template is doing load-bearing
// work here (it sets up the driver frame that the poop punchline
// breaks), and no other opening delivers the pitch format, the cargo,
// and the bird in five words. The risk is a front-loaded cliché; the
// payoff is a punchline only a pigeon can deliver.
const ENTRY = "We're Uber for breadcrumbs: I deliver crumbs citywide in under a minute, take 30% off the top, and our drivers poop on the competition — literally, from 40 feet up.";

// Gate checks matching RULES.txt: UTF-8 text, 1-200 chars, not only
// whitespace, single line.
if (!ENTRY || !ENTRY.trim()) throw new Error("entry is blank");
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
// Read-back verification: the file must be byte-identical to ENTRY.
// Reject any carriage return in the written bytes — a \r would break
// the single-line gate even though the in-memory string is clean.
const written = readFileSync(outPath, "utf8");
if (written.includes("\r")) {
  throw new Error("entry.txt contains a carriage return (\\r)");
}
if (written !== ENTRY) {
  throw new Error(
    `entry.txt mismatch: wrote ${ENTRY.length} chars, read back ${written.length}`,
  );
}
console.log(`Wrote ${ENTRY.length}-char entry to ${outPath}`);
