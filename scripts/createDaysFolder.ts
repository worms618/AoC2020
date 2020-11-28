import { DayFolderStructure } from "../src/dayFolder/structure.ts";

import { 
  DaysFolderName 
} from "../src/consts.ts";

import { 
  createFolderPathInRootFolder
} from "../src/utils.ts";

// ------- Parameters -------
const daysFolderPath = createFolderPathInRootFolder(DaysFolderName);

const startDate = new Date(2020, 11);
const endDate = new Date(2020, 11, 24);

// ------- Script -------

if (!daysFolderPath.exists)
  daysFolderPath.mkDirSync();

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();
  const dayFolder = new DayFolderStructure(daysFolderPath, dayOfMonth);

  dayFolder.mkSync();
  
  nextDate.setDate(nextDate.getDate() + 1);
};