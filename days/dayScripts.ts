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
import { scripts as day3 } from "./Day-3/mod.ts";
import { scripts as day4 } from "./Day-4/mod.ts";
import { scripts as day5 } from "./Day-5/mod.ts";
import { scripts as day6 } from "./Day-6/mod.ts";
import { scripts as day7 } from "./Day-7/mod.ts";
import { scripts as day8 } from "./Day-8/mod.ts";
import { scripts as day9 } from "./Day-9/mod.ts";
import { scripts as day10 } from "./Day-10/mod.ts";
import { scripts as day11 } from "./Day-11/mod.ts";
import { scripts as day12 } from "./Day-12/mod.ts";
import { scripts as day13 } from "./Day-13/mod.ts";
import { scripts as day14 } from "./Day-14/mod.ts";
import { scripts as day15 } from "./Day-15/mod.ts";
import { scripts as day16 } from "./Day-16/mod.ts";
import { scripts as day17 } from "./Day-17/mod.ts";
import { scripts as day18 } from "./Day-18/mod.ts";
import { scripts as day19 } from "./Day-19/mod.ts";
import { scripts as day20 } from "./Day-20/mod.ts";
import { scripts as day21 } from "./Day-21/mod.ts";

scriptsPerDayNumber.set(1, day1);
scriptsPerDayNumber.set(2, day2);
scriptsPerDayNumber.set(3, day3);
scriptsPerDayNumber.set(4, day4);
scriptsPerDayNumber.set(5, day5);
scriptsPerDayNumber.set(6, day6);
scriptsPerDayNumber.set(7, day7);
scriptsPerDayNumber.set(8, day8);
scriptsPerDayNumber.set(9, day9);
scriptsPerDayNumber.set(10, day10);
scriptsPerDayNumber.set(11, day11);
scriptsPerDayNumber.set(12, day12);
scriptsPerDayNumber.set(13, day13);
scriptsPerDayNumber.set(14, day14);
scriptsPerDayNumber.set(15, day15);
scriptsPerDayNumber.set(16, day16);
scriptsPerDayNumber.set(17, day17);
scriptsPerDayNumber.set(18, day18);
scriptsPerDayNumber.set(19, day19);
scriptsPerDayNumber.set(20, day20);
scriptsPerDayNumber.set(21, day21);
