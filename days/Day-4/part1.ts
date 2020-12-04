import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getPassportsLines, createPassportFieldsLine, passportHasRequiredFields } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const passportsWithRequiredFields = getPassportsLines(input)
    .map(createPassportFieldsLine)
    .filter(passportHasRequiredFields)
    .length;

  return `Amount of passport with required fields: ${passportsWithRequiredFields}`;
};