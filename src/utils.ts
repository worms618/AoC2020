import {Path, WINDOWS_SEPS} from "https://deno.land/x/path/mod.ts";

import { 
  daysFolder,
  templatesFolder,
  templateDayPartFileName
} from "./consts.ts";

const rootFolder = Deno.cwd();

export const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}`;
export const createPartScriptFileName = (partNumber: number) => `Part${partNumber.toString()}.ts`;
export const createPartInputFileName = (partNumber: number) => `Part${partNumber.toString()}.input.txt`;

export const combineFolders = (baseFolder: string, folder: string): Path => new Path(`${baseFolder}/${folder}`, WINDOWS_SEPS);
export const createFolderInRoot = (folderName: string): Path => combineFolders(rootFolder, folderName);

export const createFolderInDaysFolder = (folderName: string): Path => createFolderInRoot(`${daysFolder}/${folderName}`);

export const createDayFolder = (dayNumber: number): Path => createFolderInDaysFolder(createDayFolderName(dayNumber));
export const createFolderInDayFolder = (dayNumber: number, folderName: string): Path => combineFolders(createFolderInDaysFolder(createDayFolderName(dayNumber)).toString(), folderName);

export const createDayPartScriptFilePath = (dayFolderPath: Path, partNumber: number): Path => combineFolders(dayFolderPath.toString(), createPartScriptFileName(partNumber));
export const createDayPartInputFilePath = (dayFolderPath: Path, partNumber: number): Path => combineFolders(dayFolderPath.toString(), createPartInputFileName(partNumber));

export const createInTemplateFolder = (value: string): Path => new Path(`${templatesFolder}/${value}`, WINDOWS_SEPS);

export const getTemplateDayPartFilePath = (): Path => createInTemplateFolder(templateDayPartFileName);

export const writeTextFileSync = (path: Path, data: string, options?: Deno.WriteFileOptions): void => {
  Deno.writeTextFileSync(path.toString(), data, options);
};