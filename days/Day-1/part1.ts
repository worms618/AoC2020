import { DayScriptExecutor } from "../../src/day/day.types.ts";

class AdditionSumValues {
  constructor(public value1: number = -1, public value2: number = -1) {
  }

  sum(): number {
    return this.value1 + this.value2;
  }

  multiply(): number {
    return this.value1 * this.value2;
  }

  toString(): string {
    return [
      `${this.value1} + ${this.value2} = ${this.sum()};`,
      `${this.value1} * ${this.value2} = ${this.multiply()};`
    ].join('\n');
  };
}

export const executor: DayScriptExecutor = (input: string): string => {
  const inputValues: number[] = input
    .split('\n')
    .map(value => value.trim())
    .map(value => parseInt(value, 10))
    .sort();

  const additionSum = 2020;
  const values = solutionBruteForceFirstOccurance(inputValues, additionSum);

  return values.toString();
};

const solutionBruteForceFirstOccurance = (values: number[], sumTotal: number): AdditionSumValues => {
  const additionSumValues = new AdditionSumValues();

  for (let i = 0; i < values.length; i++) {
    additionSumValues.value1 = values[i];

    for (let j = 0; j < values.length; j++) {
      additionSumValues.value2 = values[j];

      if (additionSumValues.sum() === sumTotal) {
        return additionSumValues;
      }
    }
  }

  throw new Error(`No two values found in argument values, which sum to argument sumTotal: ${sumTotal}`)
};