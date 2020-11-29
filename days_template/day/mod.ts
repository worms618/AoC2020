import { dayScripts } from "../../src/day.types.ts";

import { executor as part1Executor } from "./part1.ts";
import { executor as part2Executor } from "./part2.ts";

export const scripts: dayScripts = {
  part1: part1Executor,
  part2: part2Executor
};