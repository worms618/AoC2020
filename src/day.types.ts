export type dayScriptExecutor = (input: string) => string;
export type dayScripts = {
  part1: dayScriptExecutor,
  part2: dayScriptExecutor
};