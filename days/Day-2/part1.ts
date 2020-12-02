import { DayScriptExecutor } from "../../src/day/day.types.ts";

type Policy = {
  min: number,
  max: number,
  char: string
}

type PolicyAndPassword = {
  policy: Policy,
  password: string
}

export const executor: DayScriptExecutor = (input: string): string => {
  const inputLines = input.split('\n').map(line => line.trim()).filter(line => line);
  const totalValidPassword = inputLines.map(getPolicyAndPasswordOfLine).filter(validatePasswordOverPolicy).length;

  return `Total validate passwords: [${totalValidPassword}]`;
};

const getPolicyAndPasswordOfLine = (line: string): PolicyAndPassword => {
  const details = line.split(':').map(value => value.trim());

  return {
    policy: getPolicy(details[0]),
    password: details[1]
  }
}

const getPolicy = (value: string): Policy => {
  const details = value.split(' ').map(value => value.trim());

  const constraints = details[0].split('-').map(value => parseInt(value.trim()));
  const char = details[1];

  return {
    min: constraints[0],
    max: constraints[1],
    char
  }
}

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