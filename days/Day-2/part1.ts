import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getPolicyAndPasswordOfLine, PolicyAndPassword } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const inputLines = input.split('\n').map(line => line.trim()).filter(line => line);
  const totalValidPassword = inputLines.map(getPolicyAndPasswordOfLine).filter(validatePasswordOverPolicy).length;

  return `Total valid passwords: [${totalValidPassword}]`;
};

const validatePasswordOverPolicy = (policyAndPassword: PolicyAndPassword): boolean => {
  const { min, max, char } = policyAndPassword.policy;
  let totalAppearanceOfChar = 0;

  for (const pwChar of policyAndPassword.password) {
    if (pwChar === char) {
      totalAppearanceOfChar++;
      if (totalAppearanceOfChar > max) return false;
    }
  }

  return (totalAppearanceOfChar >= min) && (totalAppearanceOfChar <= max);
};