import { RunDayAndPart } from "../src/day/day.runner.ts";

const args = Deno.args;

if (args.length < 2)
  throw new Error(`Not enough args, should be atleast two`);

const day = parseInt(args[0], 10);
const part = parseInt(args[1], 10);

RunDayAndPart(day, part);