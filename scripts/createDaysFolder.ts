import {
  DaysFolderName,
  DaysFolderTemplateName,
  DayFolderTemplateName
} from "../src/consts.ts";

import {
  CreatePathURLWithBaseRootFolder,
  DeepCopyDirectory,
  FileOrDirExists
} from "../src/utils.ts";

// ------- Utils -------

const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}/`;
const createDayFolderURL = (daysFolderURL: URL, dayNumber: number): URL => new URL(createDayFolderName(dayNumber), daysFolderURL);

// ------- Parameters -------

const daysFolderURL = CreatePathURLWithBaseRootFolder(DaysFolderName);
const dayScriptsFileURL = new URL('dayScripts.ts', daysFolderURL);

const daysTemplateFolderURL = CreatePathURLWithBaseRootFolder(DaysFolderTemplateName);
const dayTemplateFolderURL = new URL(DayFolderTemplateName, daysTemplateFolderURL);

const startDate = new Date(2020, 11);
const endDate = new Date(2020, 11, 24);

// ------- Script -------

if (!FileOrDirExists(daysFolderURL.href))
  Deno.mkdirSync(daysFolderURL.href);

if (!FileOrDirExists(dayScriptsFileURL.href)) {
  const dayScriptsTemplateFileURL = new URL('dayScripts.ts', daysTemplateFolderURL);
  Deno.copyFileSync(dayScriptsTemplateFileURL.href, dayScriptsFileURL.href);
}

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();

  const dayFolderURL = createDayFolderURL(daysFolderURL, dayOfMonth);

  if (!FileOrDirExists(dayFolderURL.href)) {
    Deno.mkdirSync(dayFolderURL.href);
    DeepCopyDirectory(dayTemplateFolderURL.href, dayFolderURL.href);
  }

  nextDate.setDate(nextDate.getDate() + 1);
};