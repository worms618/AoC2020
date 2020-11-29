import { dayScripts } from "../src/day.types.ts";

const scriptsPerDayNumber = new Map<number, dayScripts>();

export const getScriptsForDay = (day: number): dayScripts => {
  const scripts = scriptsPerDayNumber.get(day);

  if (scripts)
    return scripts
  else
    throw new Error(`No scripts found for day ${day}`);
};
