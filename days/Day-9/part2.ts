import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";
import { getNumberWithoutSumOfTwoInPreviousValues, preambleLength } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const XMASNumbers: number[] = getInputLinesTrimAndFilterEmpty(input).map(line => parseInt(line, 10));
  const numberWithoutSumOfTwoInprevious: number = getNumberWithoutSumOfTwoInPreviousValues(XMASNumbers, preambleLength);

  const contiguousSet = getContiguousSetOfAtleastTwoToTotal(XMASNumbers, numberWithoutSumOfTwoInprevious);

  contiguousSet.sort();
  const smallest = contiguousSet[0];
  const largest = contiguousSet[contiguousSet.length - 1];
  const sum = smallest + largest;
  return `Sum of smallest and largest values: ${smallest.toString()} + ${largest.toString()} = ${sum.toString()}`;
};

const getContiguousSetOfAtleastTwoToTotal = (values: number[], total: number): number[] => {
  for (let i = 0; i < values.length; i++) {
    let contiguousSet = [];
    let setTotal = 0;
    let j = i;

    while ((setTotal < total) && (j < values.length)) {
      const value = values[j];

      contiguousSet.push(value);
      setTotal += value;

      if ((setTotal === total) && contiguousSet.length >= 2) 
        return contiguousSet;
      
      j++;
    }
  }

  throw new Error(`No contiguous set of at least two value found to sum to total of: ${total}`);
};