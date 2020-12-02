import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { AdditionSumThreeValues } from "./AdditionSumValues.ts";
import { ParseInputSorted, ParseResult, AdditionSum, GetUniqueResults } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const inputValues: number[] = ParseInputSorted(input);

  // const multipleResults = solutionBruteForceAllOccurances(inputValues, AdditionSum);
  // return ParseResult(GetUniqueResults(multipleResults));
  const resultBetterPerformance = solutionBetterPerformance(inputValues, AdditionSum);
  return resultBetterPerformance.toString();
};

const solutionBruteForceAllOccurances = (values: number[], sumTotal: number): AdditionSumThreeValues[] => {
  const occurances = [];
  let addSumValuesOccurance = new AdditionSumThreeValues();

  for (let i = 0; i < values.length; i++) {
    addSumValuesOccurance.value1 = values[i];

    for (let j = 0; j < values.length; j++) {
      addSumValuesOccurance.value2 = values[j];

      for (let k = 0; k < values.length; k++) {
        addSumValuesOccurance.value3 = values[k];

        if (addSumValuesOccurance.sum() === sumTotal) {
          occurances.push(addSumValuesOccurance);

          addSumValuesOccurance = new AdditionSumThreeValues(
            addSumValuesOccurance.value1,
            addSumValuesOccurance.value2,
            addSumValuesOccurance.value3
          );
        }
      }
    }
  }

  if (occurances.length === 0)
    throw new Error(`Not one of two values found in argument values, which sum to argument sumTotal: ${sumTotal}`)
  else
    return occurances;
};

const solutionBetterPerformance = (values: number[], sumTotal: number): AdditionSumThreeValues => {
  for (const value1 of values) {
    for (const value2 of values) {
      const leftover = sumTotal - value1 - value2;
      const leftoverIndex = values.indexOf(leftover);

      if (leftoverIndex >= 0) {
        return new AdditionSumThreeValues(value1, value2, leftover)
      }
    }
  }

  throw new Error(`Not one of two values found in argument values, which sum to argument sumTotal: ${sumTotal}`)
}