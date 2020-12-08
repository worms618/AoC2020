import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";
import { createBootInstruction, BootInstruction, BootRunner } from "./shared.ts";

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

class NoRepeatBootRunner extends BootRunner {
  private instructionExecuted: boolean[];
  private didRepeat: boolean;

  constructor(instructions: BootInstruction[]) {
    super(instructions);
    this.instructionExecuted = instructions.map(() => false);
    this.didRepeat = false;
  }

  public get DidRepeat(): boolean {
    return this.didRepeat;
  }

  reset() {
    super.reset();
    this.didRepeat = false;
  }

  runCurrInstruction(): void {
    this.didRepeat = this.instructionExecuted[this.currInstructionIndex];
    if (this.didRepeat) return;

    this.instructionExecuted[this.currInstructionIndex] = true;
    super.runCurrInstruction();
  }
}