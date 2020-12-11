import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

export type SeatLayout = number[][];

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

export const nextRound = (seatLayout: SeatLayout): SeatLayout => {
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

export const getAdjacentSeatValue = (row: number, column: number, seatLayout: SeatLayout): number | undefined => {
  if ((row < 0) || (column < 0)) return undefined;

  if (row >= seatLayout.length) return undefined;

  if (column >= seatLayout[row].length) return undefined;

  return seatLayout[row][column];
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