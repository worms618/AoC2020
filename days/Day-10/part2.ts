import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty, mapToInteger, sortNumberAsc } from "../shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const joltageRatings: number[] = getInputLinesTrimAndFilterEmpty(input).map(mapToInteger()).sort(sortNumberAsc);
  const buildInAdapterJoltage = joltageRatings[joltageRatings.length - 1] + 3;
  
  const posq = getSeqToMaxValue(0, buildInAdapterJoltage, joltageRatings);
  
  return `Amount of distinct arrangements: ${posq.length}`;
};

const getSeqToMaxValue = (startValue: number, maxValue: number, values: number[]): string[] => {
  const maxJoltDiff = 3;
  const seq: string[] = [];

  if ((startValue + maxJoltDiff) === maxValue) return [startValue.toString()];

  const nextValues = values.filter(value => (value <= (startValue + maxJoltDiff)));

  nextValues.forEach(nextValue => {
    const valueIndex = values.indexOf(nextValue);
    const valuesToUse = values.slice(valueIndex + 1, values.length);
    const nextValueSeqs = getSeqToMaxValue(nextValue, maxValue, valuesToUse);
    
    nextValueSeqs.forEach(nvseq => seq.push(`${startValue.toString()}|${nvseq}`));
  });

  return seq;
};
