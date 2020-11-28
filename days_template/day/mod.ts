import { dayScripts } from "../../src/dayFolder/types.ts";

import { executor as part1Executor } from "./part1.ts";
import { executor as part2Executor } from "./part2.ts";

export const day1: dayScripts = {
  part1: part1Executor,
  part2: part2Executor
};