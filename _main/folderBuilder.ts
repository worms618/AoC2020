import {Path, WINDOWS_SEPS} from "https://deno.land/x/path/mod.ts";

const rootFolder = Deno.cwd();

const inputFolderName = 'input';

const runSolutionFile = 'index.ts';

const startDate = new Date(2020, 11);
const endDate = new Date(2020, 11, 24);
let nextDate = startDate;

const createFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}`;
const createFolderPath = (folderName: string) => new Path(rootFolder + '/' + folderName, WINDOWS_SEPS);

while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();
  
  const folderName = createFolderName(dayOfMonth);
  const folderPath = createFolderPath(folderName);
  
  const inputFolderPath = new Path(`${folderPath.toString()}/${inputFolderName}`, WINDOWS_SEPS);

  if (!folderPath.exists) 
    folderPath.mkDirSync();
  
  if (!inputFolderPath.exists)
    inputFolderPath.mkDirSync();

  nextDate.setDate(nextDate.getDate() + 1);
};