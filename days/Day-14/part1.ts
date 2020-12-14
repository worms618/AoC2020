import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getMasksWithMemAssignments, applyMask, sumTotalNonEmptyValues } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const masksWithMemAssignments = getMasksWithMemAssignments(input);

  const mem = new Map<number, string>();

  for (let i = 0; i < masksWithMemAssignments.length; i++) {
    const { mask, assignments } = masksWithMemAssignments[i];

    for (let j = 0; j < assignments.length; j++) {
      const { address, binaryValue } = assignments[j];
      const value = applyMask(mask, binaryValue);

      mem.set(address, value);
    }
  }

  let sumOfValues = sumTotalNonEmptyValues(mem);

  return `${sumOfValues}`;
};