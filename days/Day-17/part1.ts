import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInitialPocketDimension, printPocketDimension, runCycle } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const pdim = getInitialPocketDimension(input);

  printPocketDimension(pdim);

  const afterOneRun = runCycle(pdim);

  console.log('--- After one cycle ---');
  printPocketDimension(afterOneRun);

  throw new Error('Executor not implemented');
};