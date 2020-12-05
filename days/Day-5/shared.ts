export const getBoardingPasses = (input: string): string[] => {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);
};

export type SeatInfo = {
  RowNumber: number,
  ColumnNumber: number
};

export const getSeatInfo = (boardingPass: string): SeatInfo => {
  const rowPartition = boardingPass.substring(0, 7);
  const columnPartition = boardingPass.substring(7, boardingPass.length);

  const rowNumber = getDecimalFromBinaryPartition(rowPartition, 'F', 'B');
  const columnNumber = getDecimalFromBinaryPartition(columnPartition, 'L', 'R');

  return {
    RowNumber: rowNumber,
    ColumnNumber: columnNumber
  };
};

export const getDecimalFromBinaryPartition = (partition: string, lowerHalfChar: string, upperHalfChar: string): number => {
  const isLowerChar = (char: string) => char === lowerHalfChar;
  const isUpperChar = (char: string) => char === upperHalfChar;
  
  let values: number[] = [];

  for (let f = 0; f < Math.pow(2, partition.length); f++) {
    values.push(f);
  }
  
  for (let i = 0; i < partition.length; i++) {
    const partitionChar = partition.charAt(i);
    
    if (isLowerChar(partitionChar)) {
      values = values.slice(0, values.length / 2);
      continue;
    }
    
    if (isUpperChar(partitionChar)) {
      values = values.slice(values.length / 2, values.length);
      continue;
    }
    
    throw new Error(`Unknown char: [${partitionChar}] at index: [${i}] in argument partition: [${partition}]`);
  };

  return values[0];
};

export const getSeatId = (seatInfo: SeatInfo): number => {
  const { RowNumber, ColumnNumber } = seatInfo;
  return (RowNumber * 8) + ColumnNumber;
};