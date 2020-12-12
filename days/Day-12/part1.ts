import { DayScriptExecutor } from "../../src/day/day.types.ts";

import {
  FacingPosition,
  getInstructions,
  BaseNavigationPosition,
  NavigationInstruction,
  calculateManhattanDistance,
  createNavigationInstructionActions,
  applyInstructionOverPosition
} from "./shared.ts";

export type NavigationPosition = BaseNavigationPosition & {
  Facing: FacingPosition
};

export const executor: DayScriptExecutor = (input: string): string => {
  const instructions = getInstructions(input);
  const startPos: NavigationPosition = {
    Horizontal: 0,
    Vertical: 0,
    Facing: FacingPosition.East
  };

  const instructionActions = createNavigationInstructionActions([
    ActionNorth,
    ActionSouth,
    ActionEast,
    ActionWest,
    ActionRight,
    ActionLeft,
    ActionForward
  ]);

  const finalPos = instructions.reduce((curPos: NavigationPosition, instruction: NavigationInstruction) => {
    return applyInstructionOverPosition(curPos, instruction, instructionActions)
  }, startPos);

  const manhattanDisFinalPos = calculateManhattanDistance(finalPos);

  return `Manhattan distance between final position and start position: ${manhattanDisFinalPos}`;
};

const ActionNorth = (pos: NavigationPosition, value: number): NavigationPosition => {
  return {
    Horizontal: pos.Horizontal,
    Vertical: pos.Vertical + value,
    Facing: pos.Facing
  }
};

const ActionSouth = (pos: NavigationPosition, value: number): NavigationPosition => {
  return {
    Horizontal: pos.Horizontal,
    Vertical: pos.Vertical - value,
    Facing: pos.Facing
  }
};

const ActionEast = (pos: NavigationPosition, value: number): NavigationPosition => {
  return {
    Horizontal: pos.Horizontal + value,
    Vertical: pos.Vertical,
    Facing: pos.Facing
  }
};

const ActionWest = (pos: NavigationPosition, value: number): NavigationPosition => {
  return {
    Horizontal: pos.Horizontal - value,
    Vertical: pos.Vertical,
    Facing: pos.Facing
  }
};

const ActionRight = (pos: NavigationPosition, value: number): NavigationPosition => {
  let newFacing = pos.Facing;
  if ((value !== 360) && (value !== 0)) {
    const facingInOrder = [
      FacingPosition.North,
      FacingPosition.East,
      FacingPosition.South,
      FacingPosition.West
    ];

    if (value < 0) facingInOrder.reverse();

    const indexIncrement = (Math.abs(value) / 90);
    const indexCurrFacing = facingInOrder.indexOf(pos.Facing);
    let indexNewFacing = indexCurrFacing + indexIncrement;
    indexNewFacing = indexNewFacing % facingInOrder.length;

    newFacing = facingInOrder[indexNewFacing];
  }

  return {
    Horizontal: pos.Horizontal,
    Vertical: pos.Vertical,
    Facing: newFacing
  }
};

const ActionLeft = (pos: NavigationPosition, value: number): NavigationPosition => {
  return ActionRight(pos, -value);
};

const ActionForward = (pos: NavigationPosition, value: number): NavigationPosition => {
  switch (pos.Facing) {
    case FacingPosition.North:
      return ActionNorth(pos, value);
    case FacingPosition.East:
      return ActionEast(pos, value);
    case FacingPosition.South:
      return ActionSouth(pos, value);
    case FacingPosition.West:
      return ActionWest(pos, value);

    default:
      throw new Error(`No action possible while facing: ${pos.Facing}`)
  }
};