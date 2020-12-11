import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getSeatLayout, nextRound, countTotalOfSeatValue, seatLayoutsAreTheSame, OccupiedSeat } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const seatLayout = getSeatLayout(input);
  
  let currentSeatLayout = seatLayout; 
  let nextSeatLayout = seatLayout;
  while (true) {

    nextSeatLayout = nextRound(currentSeatLayout);
    
    if (seatLayoutsAreTheSame(currentSeatLayout, nextSeatLayout)) break;

    currentSeatLayout = nextSeatLayout;
  }

  const totalOccupied = countTotalOfSeatValue(currentSeatLayout, OccupiedSeat);

  return `Total seats ending up occupied: ${totalOccupied}`;
};