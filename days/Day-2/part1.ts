import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getByRegExp, ParsedInput } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const inputLines = input.split('\n').map(line => line.trim()).filter(line => line);
  const totalValidPassword = inputLines.map(getByRegExp).filter(validParsedInputWithRegex).length;

  return `Total valid passwords: [${totalValidPassword}]`;
};

const validatePasswordOverPolicy = (parsedInput: ParsedInput): boolean => {
  const { min, max, char, password } = parsedInput;
  let totalAppearanceOfChar = 0;

  for (const pwChar of password) {
    if (pwChar === char) {
      totalAppearanceOfChar++;
      if (totalAppearanceOfChar > max) return false;
    }
  }

  return (totalAppearanceOfChar >= min);
};

const validParsedInputWithRegex = (parsedInput: ParsedInput): boolean => {
  const { min, max, char, password } = parsedInput;
  const countAppearanceChar = new RegExp(`(${char})`, 'gm');

  const regResults = password.match(countAppearanceChar);

  return regResults ? ( ((regResults.length) >= min) && ((regResults.length) <= max) ) : false;
};