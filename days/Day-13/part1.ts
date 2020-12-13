import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty, mapToInteger } from "../shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const notes = getNotes(input);

  const { EarliestTime, PossibleBuses } = notes;
  
  let earliestTimeToLeave = Number.MAX_SAFE_INTEGER;
  let busToTake = -1;

  for (let i = 0; i < PossibleBuses.length; i++) {
    const bus = PossibleBuses[i];

    if ((EarliestTime % bus) === 0) {
      earliestTimeToLeave = EarliestTime; 
      busToTake = bus;
      break;
    } else {
      const nextTimeBusLeaves = Math.ceil(EarliestTime / bus) * bus;

      if (nextTimeBusLeaves < earliestTimeToLeave) {
        earliestTimeToLeave = nextTimeBusLeaves;
        busToTake = bus;
      }
    }

  }

  const timeToWait = earliestTimeToLeave - EarliestTime;

  return `${timeToWait * busToTake}`;
};

type EarliestTimeAndPossibleBuses = {
  EarliestTime: number;
  PossibleBuses: number[];
}

const getNotes = (input: string): EarliestTimeAndPossibleBuses => {
  const lines = getInputLinesTrimAndFilterEmpty(input);

  return {
    EarliestTime: parseInt(lines[0], 10),
    PossibleBuses: lines[1].split(',').map(mapToInteger(10)).filter(bus => Number.isInteger(bus))
  }
};