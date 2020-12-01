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

  const multipleResults = solutionBruteForceAllOccurances(inputValues, additionSum);
  return multipleResults.map((result, index) => `Solution ${index+1}:\n${result.toString()}`).join('\n');    
};

const solutionBruteForceAllOccurances = (values: number[], sumTotal: number): AdditionSumValues[] => {
  const occurances = [];
  let addSumValuesOccurance = new AdditionSumValues();

  for (let i = 0; i < values.length; i++) {
    addSumValuesOccurance.value1 = values[i];

    for (let j = 0; j < values.length; j++) {
      addSumValuesOccurance.value2 = values[j];

      if (addSumValuesOccurance.sum() === sumTotal) {
        occurances.push(addSumValuesOccurance);

        addSumValuesOccurance = new AdditionSumValues(
          addSumValuesOccurance.value1,
          addSumValuesOccurance.value2
        );
      }
    }
  }

  if (occurances.length === 0)
    throw new Error(`Not one of two values found in argument values, which sum to argument sumTotal: ${sumTotal}`)
  else
    return occurances;
};