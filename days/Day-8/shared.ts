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
  
  constructor(private instructions: BootInstruction[]) {
    this.currInstructionIndex = 0;
    this.accumulator = 0;

    this.reset();
  }

  public get Accumulator(): number {
    return this.accumulator;
  }

  reset() {
    this.currInstructionIndex = 0;
    this.accumulator = 0;
  }

  runCurrInstruction() { 
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