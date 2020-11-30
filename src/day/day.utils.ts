import { CreatePathURLWithBaseRootFolder } from "../utils.ts";
import { DaysFolderName } from "../consts.ts";

export const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}/`;
export const createDayPartInputFileName = (partNumber: number) => `part${partNumber.toString()}.input.txt`;

export const createDaysFolderURL = () => CreatePathURLWithBaseRootFolder(DaysFolderName);
export const createDayFolderURL = (daysFolderURL: URL, dayNumber: number): URL => new URL(createDayFolderName(dayNumber), daysFolderURL);
export const createDayInputFileURL = (dayFolderURL: URL, partNumber: number): URL => new URL(createDayPartInputFileName(partNumber), dayFolderURL);

