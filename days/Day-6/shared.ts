export const createGroupsFromInput = (input: string): string[][] => {
  const inputLines = input
    .split('\n')
    .map(line => line.trim());

  const groups: string[][] = [];

  let groupLines: string[] = [];
  for (const inputLine of inputLines) {
    if (inputLine.length > 0)
      groupLines.push(inputLine)
    else {
      groups.push(groupLines);
      groupLines = [];
    }
  }

  groups.push(groupLines);

  return groups;
}