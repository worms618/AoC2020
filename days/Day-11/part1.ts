import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getSeatLayout, nextRound, countTotalOfSeatValue, seatLayoutsAreTheSame, OccupiedSeat, SeatLayout, EmptySeat } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const seatLayout = getSeatLayout(input);
  
  let currentSeatLayout = seatLayout; 
  let nextSeatLayout = seatLayout;
  while (true) {

    nextSeatLayout = nextRound(currentSeatLayout, getAdjacentSeatValues, getNewSeatValue);
    
    if (seatLayoutsAreTheSame(currentSeatLayout, nextSeatLayout)) break;

    currentSeatLayout = nextSeatLayout;
  }

  const totalOccupied = countTotalOfSeatValue(currentSeatLayout, OccupiedSeat);

  return `Total seats ending up occupied: ${totalOccupied}`;
};

export const getAdjacentSeatValues = (rowValue: number, columnValue: number, seatLayout: SeatLayout): number[] => {
  const adjacentSeatValues: number[] = [];

  const getAndInserttAdjacentSeatValue = (row: number, column: number) => {
    //Row is already checked before executing this function
    if ((column < 0) || (column >= seatLayout[row].length)) return;

    const adjacentSeatValue = seatLayout[row][column];
    adjacentSeatValues.push(adjacentSeatValue);
  }

  const rowAbove = rowValue - 1;
  const rowBelow = rowValue + 1;

  if (rowAbove >= 0) {
    getAndInserttAdjacentSeatValue(rowAbove, columnValue - 1);
    getAndInserttAdjacentSeatValue(rowAbove, columnValue);
    getAndInserttAdjacentSeatValue(rowAbove, columnValue + 1);
  }

  //Get values same row
  getAndInserttAdjacentSeatValue(rowValue, columnValue - 1);
  getAndInserttAdjacentSeatValue(rowValue, columnValue + 1);

  if (rowBelow < seatLayout.length) {
    getAndInserttAdjacentSeatValue(rowBelow, columnValue - 1);
    getAndInserttAdjacentSeatValue(rowBelow, columnValue);
    getAndInserttAdjacentSeatValue(rowBelow, columnValue + 1);
  }

  return adjacentSeatValues;
}

export const getNewSeatValue = (currentSeatValue: number, adjacentSeatValues: number[]): number => {
  const totalAdjacentOccupiedSeats = adjacentSeatValues.filter(value => (value === OccupiedSeat)).length;
  
  const hasNoAdjacentOccupiedSeats = totalAdjacentOccupiedSeats === 0;
  const hasAtleastFourAdjacentOccupiedSeats = totalAdjacentOccupiedSeats >= 4;

  if (currentSeatValue === EmptySeat) {
    if (hasNoAdjacentOccupiedSeats) return OccupiedSeat;
  }
  else if (currentSeatValue === OccupiedSeat) {
    if (hasAtleastFourAdjacentOccupiedSeats) return EmptySeat;
  }

  return currentSeatValue;
}