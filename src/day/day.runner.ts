import { FileOrDirExists } from "../utils.ts";

import { getScriptsForDay, hasScriptsForDay } from "../../days/dayScripts.ts";

import { createDayFolderURL, createDaysFolderURL, createDayInputFileURL } from "./day.utils.ts";
import { DayScripts } from "./day.types.ts";

export function RunDayAndPart(day: number,  part: number) {
  try {
    const result = ExecutePartForDay(day, part);

    console.log(`Result while running day: [${day.toString()}] and part [${part.toString()}]`);
    console.log(result);
  } catch (error) {
    console.error(`Error while running day: [${day.toString()}] and part [${part.toString()}]`);
    console.error(error);
  }
}

export function ExecutePartForDay(day: number,  partNumber: number): string {
  const dayFolder = createDayFolderURL(createDaysFolderURL(), day);
  
  if (!FileOrDirExists(dayFolder.href))
    throw new Error(`No folder found for day: [${day.toString()}] at url: [${dayFolder.href}]`);

  if (!hasScriptsForDay(day))
    throw new Error(`No scripts available for day: [${day.toString()}]`);
  
  const scripts = getScriptsForDay(day);
  return executePartForDay(scripts, partNumber, dayFolder);
};

function executePartForDay(scripts: DayScripts, partNumber: number, dayFolderURL: URL): string {
  const partInputContent = getPartInputContent(partNumber, dayFolderURL);

  if (partNumber === 1) {
    return scripts.part1(partInputContent);
  } else if (partNumber === 2) {
    return scripts.part2(partInputContent);
  } else {
    throw new Error(`No scripts found for part: [${partNumber.toString()}]`);
  }
}

function getPartInputContent(partNumber: number, dayFolderURL: URL): string {
  const partInputFileURL = createDayInputFileURL(dayFolderURL, partNumber);

  if (!FileOrDirExists(partInputFileURL.href))
    throw new Error(`No input file found for part: [${partNumber.toString()}] at url: [${partInputFileURL.href}]`);
  
  return Deno.readTextFileSync(partInputFileURL.href);
}