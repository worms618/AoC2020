import { DayScripts } from "../src/day/day.types.ts";

const scriptsPerDayNumber = new Map<number, DayScripts>();

export const getScriptsForDay = (day: number): DayScripts => {
  const scripts = scriptsPerDayNumber.get(day);

  if (scripts)
    return scripts
  else
    throw new Error(`No scripts found for day ${day}`);
};
