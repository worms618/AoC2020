import { dayScripts as scriptsPerDayNumber } from "../src/dayFolder/types.ts";

const scriptsPerDayNumber = new Map<number, scriptsPerDayNumber>();

export const getScriptForDay = (day: number): scriptsPerDayNumber => {
  const scripts = scriptsPerDayNumber.get(day);

  if (scripts)
    return scripts
  else
    throw new Error(`No scripts found for day ${day}`);
};