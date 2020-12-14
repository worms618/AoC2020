import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { mapToInteger } from "../shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const buses = input.split(',').map(mapToInteger(10)).map(value => Number.isInteger(value) ? value : undefined);

  const earliestTimestamp = bruteForce(buses);

  return `${earliestTimestamp}`;
};

const isMultipleOf = (value: number, base: number) => (value % base) === 0;

const bruteForce = (buses: (number | undefined)[]): number => {
  const maxValue = buses.reduce((curValue: number | undefined, bus: number | undefined) => {
    if ((curValue === undefined) && (bus !== undefined)) return bus;
    if ((curValue !== undefined) && (bus !== undefined)) return curValue * bus;
    return curValue;
  })
  let earliestTimestamp = 100000000000000;
  
  if (maxValue === undefined) return -1;
  
  while (earliestTimestamp < maxValue) {
    let isCorrectSequence = true;

    for (let i = 0; i < buses.length; i++) {
      const bus = buses[i];

      if (bus === undefined) continue;

      if (!isMultipleOf(earliestTimestamp + i, bus)) {
        isCorrectSequence = false;
        break;
      }
    }

    if (isCorrectSequence) return earliestTimestamp;

    earliestTimestamp++;
  };

  return -1;
};