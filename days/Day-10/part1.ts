import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty, mapToInteger, sortNumberAsc } from "../shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const joltageRatings: number[] = getInputLinesTrimAndFilterEmpty(input).map(mapToInteger());

  const possibleDiffsAmount = new Map<number, number>([
    [1,0],
    [2,0],
    [3,0]
  ]);
  getJoltageDifferences(joltageRatings, possibleDiffsAmount);

  console.log(possibleDiffsAmount);
  const joltageDifferencesToUse = [1,3];
  const amountJoltageDifferences = joltageDifferencesToUse.map(diff => possibleDiffsAmount.get(diff)).filter(amount => amount !== undefined);
  
  const diffWithAmount: string[] = [];
  possibleDiffsAmount.forEach((value, key) => diffWithAmount.push(`${key} => ${value}`));
  const multipleOfAmount = amountJoltageDifferences.reduce((value, amount) => (amount !== undefined) && (value !== undefined) ? value * amount : value);

  return `Joltage differences => Amount joltage differences: [${diffWithAmount.join(', ')}]; Multiple of differences amount: [${joltageDifferencesToUse}] => ${multipleOfAmount}`
};

const getJoltageDifferences = (joltageRatings: number[], possibleDifferences: Map<number, number>): void => {
  const incrementJoltageDiff = (joltageDiff: number) => {
    const currAmount: number | undefined = possibleDifferences.get(joltageDiff);
    if (currAmount !== undefined) possibleDifferences.set(joltageDiff, currAmount + 1);
  };
  
  const joltages = [0].concat(joltageRatings).sort(sortNumberAsc);
  
  for (let i = 1; i < joltages.length; i++) {
    const joltageDiff = joltages[i] - joltages[i-1];
    
    incrementJoltageDiff(joltageDiff);
  }

  const diffWithBuildInAdapter = 3;  
  incrementJoltageDiff(diffWithBuildInAdapter);
};