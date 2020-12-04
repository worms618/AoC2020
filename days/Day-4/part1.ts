import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getPassportsLines, createPassportPartsLine } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const validPassports = getPassportsLines(input)
    .map(createPassportPartsLine)
    .filter(isValidPassport)
    .length;

  return `Amount of valid passports: ${validPassports}`;
};

export const isValidPassport = (passportPartsLine: string): boolean => {
  const requiredParts: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  //Check if the part with colon is present in passportParts, which is 1 line with all the passportparts
  return requiredParts.filter(reqPart => passportPartsLine.indexOf(`${reqPart}:`) < 0).length === 0;
}