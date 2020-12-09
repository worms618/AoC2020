export const preambleLength: number = 25;

export const getNumberWithoutSumOfTwoInPreviousValues = (values: number[], preambleLength: number): number => {
  for (let i = 0; i < values.length - preambleLength; i++) {
    const indexValueToCheck = i + preambleLength;
    const valueToCheck = values[indexValueToCheck];

    // @param end — The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
    const previousValues = values.slice(i, indexValueToCheck);

    if (!hasSumOfTwoValues(previousValues, valueToCheck)) return valueToCheck;
  }

  throw new Error(`No number found that could not created from two numbers in the previous values`);
};

// inspired Day 1 part 1 (solutionBetterPerformance)
export const hasSumOfTwoValues = (values: number[], sumTotal: number): boolean => {
  for (const value of values) {
    const leftover: number = sumTotal - value;
    const leftoverIndex = values.indexOf(leftover);

    if (leftoverIndex >= 0) {
      return true;
    }
  }

  return false;
}