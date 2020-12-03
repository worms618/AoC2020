import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getByRegExp, ParsedInput } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const inputLines = input.split('\n').map(line => line.trim()).filter(line => line);
  const totalValidPassword = inputLines.map(getByRegExp).filter(validatePasswordOverPolicy).length;

  return `Total valid passwords: [${totalValidPassword}]`;
};

const validatePasswordOverPolicy = (policyAndPassword: ParsedInput): boolean => {
  const { min, max, char, password } = policyAndPassword;

  const charAtMin = password.charAt(min - 1);
  const charAtMax = password.charAt(max - 1);

  const charAtMinIsSame = charAtMin === char;
  const charAtMaxIsSame = charAtMax === char;

  if (charAtMinIsSame && charAtMaxIsSame) return false;
  else if (charAtMinIsSame) return true;
  else if (charAtMaxIsSame) return true;
  else return false;
};