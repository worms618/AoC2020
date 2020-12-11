import { DayScriptExecutor } from "../../src/day/day.types.ts";
import { countTotalOfSeatValue, EmptySeat, Floor, getSeatLayout, nextRound, OccupiedSeat, SeatLayout, seatLayoutsAreTheSame } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const seatLayout = getSeatLayout(input);
  
  let currentSeatLayout = seatLayout; 
  let nextSeatLayout = seatLayout;
  while (true) {

    nextSeatLayout = nextRound(currentSeatLayout, getFirstVisibleSeatValuesInAllDirection, getNewSeatValue);
    
    if (seatLayoutsAreTheSame(currentSeatLayout, nextSeatLayout)) break;

    currentSeatLayout = nextSeatLayout;
  }

  const totalOccupied = countTotalOfSeatValue(currentSeatLayout, OccupiedSeat);

  return `Total seats ending up occupied: ${totalOccupied}`;
};

//So the first seat either empty of occupied
export const getFirstVisibleSeatValuesInAllDirection = (rowValue: number, columnValue: number, seatLayout: SeatLayout): number[] => {
  const adjacentSeatValues: number[] = [];

  const getAndInsertFirstVisibleSeat = (rowDir: number, columnDir: number) => {
    const firstVisibleSeat = getFirstVisibleSeat(rowValue, columnValue, rowDir, columnDir, seatLayout);
    if (firstVisibleSeat) adjacentSeatValues.push(firstVisibleSeat);    
  }

  getAndInsertFirstVisibleSeat(-1, -1);
  getAndInsertFirstVisibleSeat(-1,  0);
  getAndInsertFirstVisibleSeat(-1,  1);

  getAndInsertFirstVisibleSeat(0, -1);
  getAndInsertFirstVisibleSeat(0,  1);

  getAndInsertFirstVisibleSeat(1, -1);
  getAndInsertFirstVisibleSeat(1,  0);
  getAndInsertFirstVisibleSeat(1,  1);

  return adjacentSeatValues;
}

let c = 0;

export const getFirstVisibleSeat = (startRow: number, startColumn: number, rowDir: number, columnDir: number, seatLayout: SeatLayout): number | undefined => {
  let nextRow = startRow;
  let nextColumn = startColumn;
  
  while (true) {
    nextRow += rowDir;
    nextColumn += columnDir;

    if ((nextRow < 0) || (nextColumn < 0)) return undefined;

    if (nextRow >= seatLayout.length) return undefined;
  
    if (nextColumn >= seatLayout[nextRow].length) return undefined;

    const valueAtNext = seatLayout[nextRow][nextColumn]; 

    if (valueAtNext !== Floor) return valueAtNext;

  }
};

export const getNewSeatValue = (currentSeatValue: number, adjacentSeatValues: number[]): number => {
  const totalAdjacentOccupiedSeats = adjacentSeatValues.filter(value => (value === OccupiedSeat)).length;
  
  const hasNoAdjacentOccupiedSeats = totalAdjacentOccupiedSeats === 0;
  const hasAtleastFourAdjacentOccupiedSeats = totalAdjacentOccupiedSeats >= 5;

  if (currentSeatValue === EmptySeat) {
    if (hasNoAdjacentOccupiedSeats) return OccupiedSeat;
  }
  else if (currentSeatValue === OccupiedSeat) {
    if (hasAtleastFourAdjacentOccupiedSeats) return EmptySeat;
  }

  return currentSeatValue;
}