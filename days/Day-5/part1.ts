import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getBoardingPasses, getSeatId } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const boardingPasses = getBoardingPasses(input);

  const highestSeatID = boardingPasses.map(getSeatId).reduce((maxSeatId, seatId) => {
    if (seatId > maxSeatId)
      return seatId;
    return maxSeatId;
  }, 0);
  return `Highest seat ID on a boarding pass: ${highestSeatID.toString()}`;
};