export const getPassportsLines = (input: string): string[][] => {
  const inputLines = input
    .split('\n')
    .map(line => line.trim());
  
  const passportsLines: string[][] = [];
  
  let passportLines: string[] = [];
  for (const inputLine of inputLines) {
    if (inputLine.length > 0)
      passportLines.push(inputLine)
    else {
      passportsLines.push(passportLines);
      passportLines = [];
    }
  }

  return passportsLines;
}

export const createPassportPartsLine = (passportLines: string[]): string => {
  return passportLines.join(' ');
};