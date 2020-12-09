import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";
import { getNumberWithoutSumOfTwoInPreviousValues, preambleLength } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const XMASNumbers: number[] = getInputLinesTrimAndFilterEmpty(input).map(line => parseInt(line, 10));

  const numberWithoutSumOfTwoInprevious: number = getNumberWithoutSumOfTwoInPreviousValues(XMASNumbers, preambleLength);

  return `First number that is not the sum of ${preambleLength} numbers before is: ${numberWithoutSumOfTwoInprevious}`;
};