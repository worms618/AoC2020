import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const XMASNumbers: number[] = getInputLinesTrimAndFilterEmpty(input).map(line => parseInt(line, 10));

  //Preamble length
  const preambleLength: number = 25;
  const numberWithoutSumOfTwoInprevious: number = getNumberWithoutSumOfTwoInPreviousValues(XMASNumbers, preambleLength);

  return `First number that is not the sum of ${preambleLength} numbers before is: ${numberWithoutSumOfTwoInprevious}`;
};

const getNumberWithoutSumOfTwoInPreviousValues = (values: number[], preambleLength: number): number => {
  for (let i = 0; i < values.length - preambleLength; i++) {
    const indexValueToCheck = i + preambleLength;
    const valueToCheck = values[indexValueToCheck];

    // @param end — The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
    const previousValues = values.slice(i, indexValueToCheck);

    if (!hasSumOfTwoValues(previousValues, valueToCheck)) return valueToCheck;
  }

  throw new Error(`No number found that could not created from two numbers in the previous values`);
};

// inspired Day 1 part 1 (solutionBetterPerformance)
const hasSumOfTwoValues = (values: number[], sumTotal: number): boolean => {
  for (const value of values) {
    const leftover: number = sumTotal - value;
    const leftoverIndex = values.indexOf(leftover);

    if (leftoverIndex >= 0) {
      return true;
    }
  }

  return false;
}