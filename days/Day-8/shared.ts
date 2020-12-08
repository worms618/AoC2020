export enum BootOperation {
  Acc, Jmp, Nop
}

export type BootInstruction = {
  operation: BootOperation,
  argument: number
}

export const getBootOperation = (value: string): BootOperation => {
  if (value === 'acc') return BootOperation.Acc;
  if (value === 'jmp') return BootOperation.Jmp;
  if (value === 'nop') return BootOperation.Nop;
  throw new Error(`No operation found for value: ${value}`);
}

const getBootInstructionDetailsRegExp: RegExp = /(acc|jmp|nop)\s*([\+\-]\d+)/;
export const createBootInstruction = (line: string) : BootInstruction => {
  const regRes = getBootInstructionDetailsRegExp.exec(line);

  if (regRes && (regRes.length > 2)) {
    return {
      operation: getBootOperation(regRes[1].trim()),
      argument: parseInt(regRes[2].trim())
    }
  }
  throw new Error(`Invalid boot instruction syntax: [${line}]`);
}

export class BootRunner {
  protected currInstructionIndex: number;
  private accumulator: number;
  private didTerminate: boolean;
  
  constructor(private instructions: BootInstruction[]) {
    this.currInstructionIndex = 0;
    this.accumulator = 0;
    this.didTerminate = false;

    this.reset();
  }

  public get Accumulator(): number {
    return this.accumulator;
  }

  public get DidTerminate(): Boolean {
    return this.didTerminate;
  }

  reset() {
    this.currInstructionIndex = 0;
    this.accumulator = 0;
    this.didTerminate = false;
  }

  runCurrInstruction() {
    this.didTerminate = (this.currInstructionIndex >= this.instructions.length);
    if (this.didTerminate) return;

    const instruction = this.instructions[this.currInstructionIndex];
    this.runInstruction(instruction);
  }

  private runInstruction(instruction: BootInstruction) {
    switch (instruction.operation) {
      case BootOperation.Acc:
        this.accumulator += instruction.argument;
        this.currInstructionIndex++;
        break;
      case BootOperation.Jmp:
        this.currInstructionIndex += instruction.argument;
        break;
      case BootOperation.Nop:
        this.currInstructionIndex++;
        break;        
      default:
          throw new Error(`Unknown operation: ${instruction.operation}`);
        break;
    }
  }
};

export class NoRepeatBootRunner extends BootRunner {
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