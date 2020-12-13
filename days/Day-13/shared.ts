import { getInputLinesTrimAndFilterEmpty, mapToInteger } from "../shared.ts";

export type EarliestTimeAndPossibleBuses = {
  EarliestTime: number;
  PossibleBuses: number[];
}

export const getNotes = (input: string): EarliestTimeAndPossibleBuses => {
  const lines = getInputLinesTrimAndFilterEmpty(input);

  return {
    EarliestTime: parseInt(lines[0], 10),
    PossibleBuses: lines[1].split(',').map(mapToInteger(10)).filter(bus => Number.isInteger(bus))
  }
};