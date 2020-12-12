import { DayScriptExecutor } from "../../src/day/day.types.ts";
import {
  applyInstructionOverPosition,
  BaseNavigationPosition,
  calculateManhattanDistance,
  copyBasePosition,
  createNavigationInstructionActions,
  getInstructions,
  NavigationInstruction
} from "./shared.ts";

export type NavigationPosition = BaseNavigationPosition & {
  Waypoint: BaseNavigationPosition
};

const copyPosition = (pos: NavigationPosition): NavigationPosition => ({
  Horizontal: pos.Horizontal,
  Vertical: pos.Vertical,
  Waypoint: copyBasePosition(pos.Waypoint)
})

export const executor: DayScriptExecutor = (input: string): string => {
  const instructions = getInstructions(input);

  const startWaypoint: BaseNavigationPosition = {
    Horizontal: 10,
    Vertical: 1
  }
  const startPos: NavigationPosition = {
    Horizontal: 0,
    Vertical: 0,
    Waypoint: startWaypoint
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
  const newPos = copyPosition(pos);
  newPos.Waypoint.Vertical += value;
  return newPos;
};

const ActionSouth = (pos: NavigationPosition, value: number): NavigationPosition => {
  const newPos = copyPosition(pos);
  newPos.Waypoint.Vertical -= value;
  return newPos;
};

const ActionEast = (pos: NavigationPosition, value: number): NavigationPosition => {
  const newPos = copyPosition(pos);
  newPos.Waypoint.Horizontal += value;
  return newPos;
};

const ActionWest = (pos: NavigationPosition, value: number): NavigationPosition => {
  const newPos = copyPosition(pos);
  newPos.Waypoint.Horizontal -= value;
  return newPos;
};

const ActionRight = (pos: NavigationPosition, angle: number): NavigationPosition => {
  const newPos = copyPosition(pos);
  if ((angle !== 360) && (angle !== 0)) {
    let transformations = [
      (waypoint: BaseNavigationPosition) => {
        return {
          Horizontal: waypoint.Vertical,
          Vertical: -waypoint.Horizontal
        };
      }, // CW 90-degree | ACW 270-degree
      (waypoint: BaseNavigationPosition) => {
        return {
          Horizontal: -waypoint.Horizontal,
          Vertical: -waypoint.Vertical
        };
      }, // 180-degree
      (waypoint: BaseNavigationPosition) => {
        return {
          Horizontal: -waypoint.Vertical,
          Vertical: waypoint.Horizontal
        };
      }, // CW 270-degree | ACW 90-degree
    ];

    if (angle < 0) transformations.reverse();

    transformations = [
      (waypoint: BaseNavigationPosition) => waypoint, // 0-degree
    ].concat(transformations);

    const indexTransformation = (Math.abs(angle) / 90);

    newPos.Waypoint = transformations[indexTransformation](newPos.Waypoint);
  }
  return newPos;
};

const ActionLeft = (pos: NavigationPosition, angle: number): NavigationPosition => {
  return ActionRight(pos, -angle);
};

const ActionForward = (pos: NavigationPosition, value: number): NavigationPosition => {
  const newPos = copyPosition(pos);
  const { Horizontal, Vertical } = newPos.Waypoint;
  newPos.Horizontal += (Horizontal * value);
  newPos.Vertical += (Vertical * value);

  return newPos;
};