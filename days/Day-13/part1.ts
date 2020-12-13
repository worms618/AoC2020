import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getNotes } from "./shared.ts";

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