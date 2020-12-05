import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getBoardingPasses, getSeatInfo, getSeatId } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const highestSeatID = getBoardingPasses(input)
    .map(getSeatInfo)
    .map(getSeatId)
    .reduce(getMaxNumber, 0);
  
    return `Highest seat ID on a boarding pass: ${highestSeatID.toString()}`;
};

export const getMaxNumber = (maxValue: number, value: number): number => maxValue > value ? maxValue : value;