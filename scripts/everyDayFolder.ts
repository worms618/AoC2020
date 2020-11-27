import { DayFolderModel } from "../src/dayFolder/model.ts";

import { daysFolder } from "../src/consts.ts";

import { createFolderInRoot } from "../src/utils.ts";

// ------- Parameters -------
const daysFolderPath = createFolderInRoot(daysFolder);

const startDate = new Date(2020, 11);
const endDate = new Date(2020, 11, 24);

// ------- Script -------

if (!daysFolderPath.exists)
  daysFolderPath.mkDirSync();

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();
  const dayFolder = new DayFolderModel(dayOfMonth);

  dayFolder.mkSync('');
  
  nextDate.setDate(nextDate.getDate() + 1);
};