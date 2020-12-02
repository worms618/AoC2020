import { DayScripts } from "../src/day/day.types.ts";

const scriptsPerDayNumber = new Map<number, DayScripts>();

export const getScriptsForDay = (day: number): DayScripts => {
  const scripts = scriptsPerDayNumber.get(day);

  if (scripts)
    return scripts
  else
    throw new Error(`No scripts found for day ${day}`);
};

export const hasScriptsForDay = (day: number): boolean => {
  return scriptsPerDayNumber.has(day);
};
// ------- Import and set in map statements for scripts of day -------

import { scripts as day1 } from "./Day-1/mod.ts";
import { scripts as day2 } from "./Day-2/mod.ts";

scriptsPerDayNumber.set(1, day1);
scriptsPerDayNumber.set(2, day2);
