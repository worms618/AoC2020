import { DayFolderModel } from "../src/dayFolder/model.ts";

import { daysFolder } from "../src/consts.ts";

import { 
  createFolderInRoot,
  getTemplateDayPartFilePath
} from "../src/utils.ts";

// ------- Parameters -------
const daysFolderPath = createFolderInRoot(daysFolder);
const templateDayPartFilePath = getTemplateDayPartFilePath();

const startDate = new Date(2020, 11);
const endDate = new Date(2020, 11, 24);

// ------- Script -------

const templateDayPartContent: string = Deno.readTextFileSync(templateDayPartFilePath.toString());

if (!daysFolderPath.exists)
  daysFolderPath.mkDirSync();

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();
  const dayFolder = new DayFolderModel(dayOfMonth);

  dayFolder.mkSync(templateDayPartContent);
  
  nextDate.setDate(nextDate.getDate() + 1);
};