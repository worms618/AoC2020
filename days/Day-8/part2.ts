import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";
import { BootOperation, createBootInstruction, NoRepeatBootRunner, BootRunner } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const bootInstructions = getInputLinesTrimAndFilterEmpty(input).map(createBootInstruction);

  let terminatedBootRunner: BootRunner | undefined = undefined;
  for (let i = 0; i < bootInstructions.length; i++) {
    const bootInstruction = bootInstructions[i];
    if (bootInstruction.operation === BootOperation.Acc) continue;

    const copyBootInstructions = bootInstructions.map(originalInstruction => ({
      operation: originalInstruction.operation,
      argument: originalInstruction.argument
    }));
    
    if (bootInstruction.operation === BootOperation.Jmp)
      copyBootInstructions[i].operation = BootOperation.Nop;
    
    else if (bootInstruction.operation === BootOperation.Nop)
      copyBootInstructions[i].operation = BootOperation.Jmp;
    
    terminatedBootRunner = returnBootRunnerIfTerminates(new NoRepeatBootRunner(copyBootInstructions));
    if (terminatedBootRunner !== undefined) break;
  }

  if (terminatedBootRunner)
    return `Accumulator after boot runner terminated: ${terminatedBootRunner.Accumulator}`;

  throw new Error('Could not fix instructions, to get to terminated bootrunner');
};

const returnBootRunnerIfTerminates = (noRepeatBootRunner: NoRepeatBootRunner): BootRunner | undefined => {
  while (true) {
    if (noRepeatBootRunner.DidRepeat) return undefined;
    if (noRepeatBootRunner.DidTerminate) return noRepeatBootRunner;
    noRepeatBootRunner.runCurrInstruction();
  }
};