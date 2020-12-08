import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";
import { createBootInstruction, NoRepeatBootRunner } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const bootInstructions = getInputLinesTrimAndFilterEmpty(input).map(createBootInstruction);
  const noRepeatRunner = new NoRepeatBootRunner(bootInstructions);

  noRepeatRunner.reset();
  
  let accBeforeRepeatInstruction = noRepeatRunner.Accumulator;
  while (!noRepeatRunner.DidRepeat) {
    accBeforeRepeatInstruction = noRepeatRunner.Accumulator;
    noRepeatRunner.runCurrInstruction();
  }
  
  return `Accumulator before running instruction second time: ${accBeforeRepeatInstruction}`
};