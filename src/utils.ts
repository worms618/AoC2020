import {Path, WINDOWS_SEPS} from "https://deno.land/x/path/mod.ts";

import { 
  daysFolder, 
  inputFolderName, 
  partOneFileName,
  partTwoFileName
} from "./consts.ts";

const rootFolder = Deno.cwd();

export const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}`;

export const combineFolders = (baseFolder: string, folder: string): Path => new Path(`${baseFolder}/${folder}`, WINDOWS_SEPS);
export const createFolderInRoot = (folderName: string): Path => combineFolders(rootFolder, folderName);

export const createFolderInDaysFolder = (folderName: string): Path => createFolderInRoot(`${daysFolder}/${folderName}`);

export const createDayFolder = (dayNumber: number): Path => createFolderInDaysFolder(createDayFolderName(dayNumber));
export const createFolderInDayFolder = (dayNumber: number, folderName: string): Path => combineFolders(createFolderInDaysFolder(createDayFolderName(dayNumber)).toString(), folderName);
export const createInputFolderInDayFolder = (dayNumber: number): Path => createFolderInDayFolder(dayNumber, inputFolderName);

export const createDayPartOneFilePath = (dayNumber: number): Path => createFolderInDayFolder(dayNumber, partOneFileName);
export const createDayPartTwoFilePath = (dayNumber: number): Path => createFolderInDayFolder(dayNumber, partTwoFileName);

export const writeTextFileSync = (path: Path, data: string, options?: Deno.WriteFileOptions): void => {
  Deno.writeTextFileSync(path.toString(), data, options);
};