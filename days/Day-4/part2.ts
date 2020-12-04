import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getPassportsLines, createPassportFieldsLine, passportHasRequiredFields, passportFieldsAreValid } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const passportsWithRequiredFieldsAndValidFields = getPassportsLines(input)
    .map(createPassportFieldsLine)
    .filter(passportHasRequiredFields)
    .filter(passportFieldsAreValid)
    .length;
  
  return `Amount of passports with required fields and valid fields: ${passportsWithRequiredFieldsAndValidFields}`;
};