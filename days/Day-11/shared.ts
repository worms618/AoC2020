import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

export type SeatLayout = number[][];
export type GetAdjacentSeatValues = (rowValue: number, columnValue: number, seatLayout: SeatLayout) => number[];
export type GetNewSeatValue = (currentSeatValue: number, adjacentSeatValues: number[]) => number;

export const Floor = 0;
export const EmptySeat = 1;
export const OccupiedSeat = 2;

const CharToSeatValueMap = new Map<string, number>(
  [
    ['.', Floor],
    ['L', EmptySeat],
    ['#', OccupiedSeat]
  ]
);

export const CharToSeatValue = (char: string): number => {
  const seatValue = CharToSeatValueMap.get(char);

  if (seatValue !== undefined) return seatValue;
  throw new Error(`No value found for char: [${char}]`);
}

export const seatValueToChar = (seatValue: number): string => {
  for (const [char, value] of CharToSeatValueMap.entries()) {
    if (value === seatValue) return char;
  }
  throw new Error(`No char found for value [${seatValue}]`); 
}

export const getSeatLayout = (input: string): SeatLayout => {
  return getInputLinesTrimAndFilterEmpty(input)
    .map(line => Array.from(line).map(CharToSeatValue));
}

export const copySeatLayout = (seatLayout: SeatLayout): SeatLayout => {
  return Array.from(seatLayout.map(row => Array.from(row)));
}

export const nextRound = (seatLayout: SeatLayout, getAdjacentSeatValues: GetAdjacentSeatValues, getNewSeatValue: GetNewSeatValue): SeatLayout => {
  const nextRound = copySeatLayout(seatLayout);

  for (let r = 0; r < seatLayout.length; r++) {
    for (let c = 0; c < seatLayout[r].length; c++) {
      const seatValue = seatLayout[r][c];

      if (seatValue === Floor) continue;

      const adjacentSeatValues = getAdjacentSeatValues(r, c, seatLayout);
      nextRound[r][c] = getNewSeatValue(seatValue, adjacentSeatValues);
    }
  }

  return nextRound;
};

export const seatLayoutToString = (seatLayout: SeatLayout): string => {
  return seatLayout
    .map(row => row.map(seatValueToChar).join(' '))
    .join('\n');
};

export const seatLayoutsAreTheSame = (seatLayoutA: SeatLayout, seatLayoutB: SeatLayout): boolean => {
  for (let r = 0; r < seatLayoutA.length; r++) {
    for (let c = 0; c < seatLayoutA[r].length; c++) {
      const seatValueA = seatLayoutA[r][c];
      const seatValueB = seatLayoutB[r][c];

      if (seatValueA !== seatValueB) return false;
    }
  }

  return true;
}

export const countTotalOfSeatValue = (seatLayout: SeatLayout, seatValueToCount: number): number => {
  let total = 0;
  
  for (let r = 0; r < seatLayout.length; r++) {
    for (let c = 0; c < seatLayout[r].length; c++) {
      const seatValue = seatLayout[r][c];
      
      if (seatValue === seatValueToCount) total++;
    }
  }

  return total;
}