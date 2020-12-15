import { DayScriptExecutor } from "../../src/day/day.types.ts";
import { mapToInteger } from "../shared.ts";
import { getTurnNthSpokenNumber } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const numberSpokenAtTurn = 30000000;

  const startingNumbers = input.split(',').map(mapToInteger(10));
  const numberAtTurn = getTurnNthSpokenNumber(startingNumbers, numberSpokenAtTurn);

  return `Number spoken at turn: ${numberSpokenAtTurn} is: ${numberAtTurn}`;
};