import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { AdditionSumTwoValues } from "./AdditionSumValues.ts";
import { ParseInputSorted, ParseResult, AdditionSum, GetUniqueResults } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const inputValues: number[] = ParseInputSorted(input);

  // const multipleResults = solutionBruteForceAllOccurances(inputValues, AdditionSum);
  // return ParseResult(GetUniqueResults(multipleResults));

  const resultBetterPerformance = solutionBetterPerformance(inputValues, AdditionSum);
  return resultBetterPerformance.toString();
};

const solutionBruteForceAllOccurances = (values: number[], sumTotal: number): AdditionSumTwoValues[] => {
  const occurances = [];
  let addSumValuesOccurance = new AdditionSumTwoValues();

  for (let i = 0; i < values.length; i++) {
    addSumValuesOccurance.value1 = values[i];

    for (let j = 0; j < values.length; j++) {
      addSumValuesOccurance.value2 = values[j];

      if (addSumValuesOccurance.sum() === sumTotal) {
        occurances.push(addSumValuesOccurance);

        addSumValuesOccurance = new AdditionSumTwoValues(
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

const solutionBetterPerformance = (values: number[], sumTotal: number): AdditionSumTwoValues => {
  for (const value of values) {
    const leftover: number = sumTotal - value;
    const leftoverIndex = values.indexOf(leftover);

    if (leftoverIndex >= 0) {
      return new AdditionSumTwoValues(value, leftover)
    }
  }

  throw new Error(`Not one of two values found in argument values, which sum to argument sumTotal: ${sumTotal}`);
}