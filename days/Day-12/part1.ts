import { DayScriptExecutor } from "../../src/day/day.types.ts";

import {
  FacingPosition,
  getInstructions,
  NavigationPosition,
  applyInstructionOverPosition,
  NavigationInstruction,
  calculateManhattanDistance
} from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const instructions = getInstructions(input);
  const startPos: NavigationPosition = {
    Horizontal: 0,
    Vertical: 0,
    Facing: FacingPosition.East
  };

  const finalPos = instructions.reduce((curPos: NavigationPosition, instruction: NavigationInstruction) => {
    return applyInstructionOverPosition(curPos, instruction)
  }, startPos);

  const manhattanDisFinalPos = calculateManhattanDistance(finalPos);

  return `Manhattan distance between final position and start position: ${manhattanDisFinalPos}`;
};