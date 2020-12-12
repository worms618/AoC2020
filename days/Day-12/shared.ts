import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

export type NavigationInstruction = {
  Action: string,
  Value: number
};

export enum FacingPosition {
  North, East, South, West
};

export type NavigationPosition = {
  /**
   * East or west position
   * East by Horizontal >= 0
   * West by Horizontal < 0
   */
  Horizontal: number;

  /**
   * North of south position
   * North by Vertical >= 0
   * South by Vertical < 0
   */
  Vertical: number;

  Facing: FacingPosition
};

type NavigationInstructionAction = (pos: NavigationPosition, value: number) => NavigationPosition;

export const getInstructions = (input: string): NavigationInstruction[] => {
  return getInputLinesTrimAndFilterEmpty(input)
    .map(getInstruction)
};

const getInstructionDetailsRegExp = /([NSEWLRF]{1})(\d+)/;
const getInstruction = (line: string): NavigationInstruction => {
  const regRes = getInstructionDetailsRegExp.exec(line);

  if (regRes && (regRes.length > 2)) {
    return {
      Action: regRes[1],
      Value: parseInt(regRes[2], 10)
    }
  }
  throw new Error(`Could not instruction details for line: ${line}`);
};

export const calculateManhattanDistance = (pos: NavigationPosition): number => {
  return Math.abs(pos.Vertical) + Math.abs(pos.Horizontal);
}

export const applyInstructionOverPosition = (pos: NavigationPosition, instruction: NavigationInstruction): NavigationPosition => {
  const action = InstructionActions.get(instruction.Action);
  if (action) return action(pos, instruction.Value);
  throw new Error(`No action for [${instruction.Action}]`);
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

const InstructionActions = new Map<string, NavigationInstructionAction>(
  [
    ['N', ActionNorth],
    ['S', ActionSouth],
    ['E', ActionEast],
    ['W', ActionWest],
    ['R', ActionRight],
    ['L', ActionLeft],
    ['F', ActionForward],
  ]
);
