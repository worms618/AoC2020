import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty, mapToInteger, sortNumberAsc } from "../shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const joltageRatings: number[] = getInputLinesTrimAndFilterEmpty(input).map(mapToInteger()).sort(sortNumberAsc);
  const buildInAdapterJoltage = joltageRatings[joltageRatings.length - 1] + 3;
  
  const joltages = [0].concat(joltageRatings);
  joltages.push(buildInAdapterJoltage);
  const splittedValues: number[][] = [];

  splitValues(joltages, splittedValues);

  const totalPerValues = splittedValues.map(getTotalPathsForSet);
  const totalPaths = totalPerValues.reduce((totalPaths: number, totalPath: number) => {
    return totalPaths = totalPaths * totalPath;
  }, 1);
  
  return `Amount of distinct arrangements: ${totalPaths}`;
};

const splitValues = (joltages: number[], joltageInSets: number[][]): void => {
  if (joltages.length === 0) return;

  const firstValue = joltages[0];
  const valuesInSet: number[] = [firstValue];
  for (let i = 1; i < joltages.length; i++) {
    const nextValue = joltages[i];

    for (let j = 0; j < valuesInSet.length; j++) {
      const valueInSetValue = valuesInSet[j];
      const diffValueInSetAndNext = (nextValue - valueInSetValue);
      
      if (diffValueInSetAndNext < 3) {
        valuesInSet.push(nextValue);
        break;
      }
    }
  }

  joltageInSets.push(valuesInSet);
  
  const latestNr = valuesInSet[valuesInSet.length - 1];
  const indexLatestNr = joltages.indexOf(latestNr);
  splitValues(joltages.slice(indexLatestNr+1, joltages.length), joltageInSets);
};

const getTotalPathsForSet = (values: number[]): number => {
  if (values.length === 0) return 0;
  if (values.length <= 2) return 1;

  const startValue = values[0];
  const maxValue = values[values.length - 1];
  const valuesToAnalyse = values.slice(1);

  return getSeqToMaxValue(startValue, maxValue, valuesToAnalyse).length;
};

//Maybe not make the sequences but only count
const getSeqToMaxValue = (startValue: number, maxValue: number, values: number[]): string[] => {
  const maxJoltDiff = 3;
  const seq: string[] = [];

  if (startValue === maxValue) return [startValue.toString()];

  const nextValues = values.filter(value => (value <= (startValue + maxJoltDiff)));

  nextValues.forEach(nextValue => {
    const valueIndex = values.indexOf(nextValue);
    const valuesToUse = values.slice(valueIndex + 1, values.length);
    const nextValueSeqs = getSeqToMaxValue(nextValue, maxValue, valuesToUse);
    
    nextValueSeqs.forEach(nvseq => seq.push(`${startValue.toString()}|${nvseq}`));
  });

  return seq;
};
