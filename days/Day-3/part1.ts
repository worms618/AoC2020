import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getTreeMap, Point2D, calcHitOfTree } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const slope = new Point2D(3, 1);

  const startPoint = new Point2D(1, 1);

  const treeMap = getTreeMap(input);
  const amountHitByTree = calcHitOfTree(startPoint, slope, treeMap);

  return `[${amountHitByTree}] times hit by a tree`;
};