export type DayScriptExecutor = (input: string) => string;
export type DayScripts = {
  part1: DayScriptExecutor,
  part2: DayScriptExecutor
};