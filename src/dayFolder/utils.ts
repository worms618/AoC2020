import { Path } from "https://deno.land/x/path/mod.ts";

import { combineToPath } from "../utils.ts";

export const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}`;

export const createPartScriptFileName = (partNumber: number) => `Part${partNumber.toString()}.ts`;
export const createPartInputFileName = (partNumber: number) => `Part${partNumber.toString()}.input.txt`;

export const createFolderPathInDaysFolder = (daysFolderPath: Path, folderName: string): Path => combineToPath(daysFolderPath.toString(), folderName);
export const createDayFolderPath = (daysFolderPath: Path, dayNumber: number): Path => createFolderPathInDaysFolder(daysFolderPath, createDayFolderName(dayNumber));

export const createDayPartScriptFilePath = (dayFolderPath: Path, partNumber: number): Path => combineToPath(dayFolderPath.toString(), createPartScriptFileName(partNumber));
export const createDayPartInputFilePath = (dayFolderPath: Path, partNumber: number): Path => combineToPath(dayFolderPath.toString(), createPartInputFileName(partNumber));