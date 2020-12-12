import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

export type NavigationInstruction = {
  Action: string,
  Value: number
};

export enum FacingPosition {
  North, East, South, West
};

export type BaseNavigationPosition = {
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
};

export type BaseNavigationInstructionAction<P> = {
  (pos: P, value: number): P
}

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

export const calculateManhattanDistance = (pos: BaseNavigationPosition): number => {
  return Math.abs(pos.Vertical) + Math.abs(pos.Horizontal);
}

export const copyBasePosition = (pos: BaseNavigationPosition): BaseNavigationPosition => ({
  Horizontal: pos.Horizontal,
  Vertical: pos.Vertical
});

export function createNavigationInstructionActions<T>(actions: T[]): Map<string, T> {
  return new Map<string, T>(
    [
      ['N', actions[0]],
      ['S', actions[1]],
      ['E', actions[2]],
      ['W', actions[3]],
      ['R', actions[4]],
      ['L', actions[5]],
      ['F', actions[6]]
    ]
  );
}

export function applyInstructionOverPosition<P, A extends BaseNavigationInstructionAction<P>>(pos: P, instruction: NavigationInstruction, instructionActions: Map<string, A>): P {
  const action = instructionActions.get(instruction.Action);
  if (action) return action(pos, instruction.Value);
  throw new Error(`No action for [${instruction.Action}]`);
};