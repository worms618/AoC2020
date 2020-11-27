import { DayFolder } from "./folderBuilder.model.ts";

import { daysFolder } from "../../src/consts.ts";

import { createFolderInRoot } from "../../src/utils.ts";

// ------- Constants -------

const daysFolderPath = createFolderInRoot(daysFolder);

const startDate = new Date(2020, 11);
// const endDate = new Date(2020, 11, 24);
const endDate = new Date(2020, 11, 1);

// ------- Script -------

if (!daysFolderPath.exists)
  daysFolderPath.mkDirSync();

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();
  const dayFolder = new DayFolder(dayOfMonth);

  dayFolder.mkSync('');
  
  nextDate.setDate(nextDate.getDate() + 1);
};