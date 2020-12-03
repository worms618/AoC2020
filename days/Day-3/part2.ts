import { DayScriptExecutor } from "../../src/day/day.types.ts";
import { getTreeMap, Point2D, calcHitOfTree } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const staticStartPoint = new Point2D(1, 1);
  const treeMap = getTreeMap(input);
  const slopes: Point2D[] = [
    new Point2D(1, 1),
    new Point2D(3, 1),
    new Point2D(5, 1),
    new Point2D(7, 1),
    new Point2D(1, 2)
  ];

  const resultForSlope = slopes.map(slope => ({
    slope,
    treesHit: calcHitOfTree(staticStartPoint, slope, treeMap)
  }));

  const treesHitMult = resultForSlope.reduce((mult, resultForSlope) => {
    mult *= resultForSlope.treesHit;
    return mult;
  }, 1);

  let resultLines: string[] = [];

  resultLines = resultLines.concat(resultForSlope.map(resultForSlope => `Slope: [${resultForSlope.slope.x}, ${resultForSlope.slope.y}] => ${resultForSlope.treesHit}`));
  resultLines.push(resultForSlope.map(resultForSlope => resultForSlope.treesHit).join(' * ') + ` = ${treesHitMult}`);

  return resultLines.join('\n');
};