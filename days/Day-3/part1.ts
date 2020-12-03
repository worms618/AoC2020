import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { TreeMap, getTreeMap, Point2D, TreeChar } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const slope = new Point2D(3, 1);

  const startPoint = new Point2D(1, 1);

  const treeMap = getTreeMap(input);
  const amountHitByTree = calcHitOfTree(startPoint, slope, treeMap);

  return `[${amountHitByTree}] times hit by a tree`;
};

const calcHitOfTree = (startPoint: Point2D, slope: Point2D, treeMap: TreeMap): number => {
  const heightTreeMap = treeMap.length;
  const widthTreeMap = treeMap[0].length;
  const nextPos = startPoint.copy()
  let treesHit = 0;
  
  while (true) {
    if (nextPos.y > heightTreeMap) break;

    if (nextPos.x > widthTreeMap) {
      treesHit += calcHitOfTree(
        new Point2D((nextPos.x - widthTreeMap), nextPos.y),
        slope,
        treeMap
      );
      break;
    }
    else {
      const charAtNextPos = treeMap[nextPos.y - 1][nextPos.x - 1];
      charAtNextPos === TreeChar ? treesHit++ : {};
    }

    nextPos.add(slope);
  }

  return treesHit;
};