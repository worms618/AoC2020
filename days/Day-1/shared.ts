import { AdditionSumValues } from "./AdditionSumValues.ts";

export const ParseInputSorted = (input: string): number[] => {
  return input.split('\n')
    .map(value => value.trim())
    .map(value => parseInt(value, 10))
    .sort();
};

export const GetUniqueResults = (results: AdditionSumValues[]): AdditionSumValues[] => {
  type MultOfValues = {
    mults: number[],
    values: AdditionSumValues[]
  };

  return results
  .reduce<MultOfValues>((multOfValues, result) => {
    const resultMult = result.multiply();
    
    if (multOfValues.mults.indexOf(resultMult) < 0) {
      multOfValues.mults.push(resultMult);
      multOfValues.values.push(result);
    }
    
    return multOfValues;
  }, {
    mults: [],
    values: []
  })
  .values;
}

export const ParseResult = (results: AdditionSumValues[]): string => {
  return results.map((result, index) => `Solution ${index+1}:\n${result.toString()}`).join('\n');
}

export const AdditionSum = 2020;