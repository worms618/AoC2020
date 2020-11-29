import { Path } from "https://deno.land/x/path/mod.ts";

import { 
  DaysFolderName,
  DaysFolderTemplateName
} from "../src/consts.ts";

import { 
  createFolderPathInRootFolder,
  combineToPath,
  deepCopyDirectory,
  copyFileSync
} from "../src/utils.ts";

// ------- Utils -------

const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}`;
const createDayFolderPath = (daysFolderPath: Path, dayNumber: number): Path => combineToPath(daysFolderPath.toString(), createDayFolderName(dayNumber));

// ------- Parameters -------

const daysFolderPath = createFolderPathInRootFolder(DaysFolderName);
const dayScriptsFilePath = combineToPath(daysFolderPath.toString(), 'dayScripts.ts');

const daysFolderTemplateFolderPath = createFolderPathInRootFolder(DaysFolderTemplateName);
const dayFolderTemplatePath = combineToPath(daysFolderTemplateFolderPath.toString(), 'day');

const startDate = new Date(2020, 11);
const endDate = new Date(2020, 11, 24);

// ------- Script -------

if (!daysFolderPath.exists)
  daysFolderPath.mkDirSync();

if (!dayScriptsFilePath.exists) {
  const dayScriptsTemplateFilePath = combineToPath(daysFolderTemplateFolderPath.toString(), 'dayScripts.ts');
  copyFileSync(dayScriptsTemplateFilePath, dayScriptsFilePath);
}

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();

  const dayFolderPath = createDayFolderPath(daysFolderPath, dayOfMonth);

  if (!dayFolderPath.exists)
    dayFolderPath.mkDirSync();
  
  // Instance of Path does not return separator at last entry
  deepCopyDirectory(
    dayFolderTemplatePath.toString() + dayFolderTemplatePath.separatorList[0], 
    dayFolderPath.toString() + dayFolderTemplatePath.separatorList[0]
  );
  
  nextDate.setDate(nextDate.getDate() + 1);
};