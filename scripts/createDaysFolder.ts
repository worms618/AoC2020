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

const createDayScriptsImportAlias = (dayOfMonth: number) => `day${dayOfMonth}`;
const createImportDayScriptsStatement = (dayOfMonth: number) => `import { scripts as ${createDayScriptsImportAlias(dayOfMonth)} } from "./${createDayFolderName(dayOfMonth)}mod.ts";`;
const createSetDayScriptsInMapStatement = (dayOfMonth: number) => `scriptsPerDayNumber.set(${dayOfMonth}, ${createDayScriptsImportAlias(dayOfMonth)});`;

// ------- Types -------

type ImportAndSetInMapStatements = { importStatements: string[], setInMapStatements: string[] };

// ------- Consts -------

const daysFolderURL = CreatePathURLWithBaseRootFolder(DaysFolderName);
const dayScriptsFileURL = new URL('dayScripts.ts', daysFolderURL);

const daysTemplateFolderURL = CreatePathURLWithBaseRootFolder(DaysFolderTemplateName);
const dayTemplateFolderURL = new URL(DayFolderTemplateName, daysTemplateFolderURL);

const startDate = new Date(2020, 11);
// const endDate = new Date(2020, 11, 24);
const endDate = new Date(2020, 11, 3);

const importAndSetInMapStatementsSectionHeader = '// ------- Import and set in map statements for scripts of day -------';

// ------- Variables -------

const usedDaysOfMonth: number[] = [];

// ------- Create days folder -------

if (!FileOrDirExists(daysFolderURL.href))
  Deno.mkdirSync(daysFolderURL.href);

// ------- Create day folders based on template -------

let nextDate = startDate;
while (nextDate <= endDate) {
  const dayOfMonth = nextDate.getDate();

  const dayFolderURL = createDayFolderURL(daysFolderURL, dayOfMonth);

  if (!FileOrDirExists(dayFolderURL.href)) {
    Deno.mkdirSync(dayFolderURL.href);
    DeepCopyDirectory(dayTemplateFolderURL.href, dayFolderURL.href);
  }

  usedDaysOfMonth.push(dayOfMonth);
  nextDate.setDate(nextDate.getDate() + 1);
};

// ------- Create import and set in map section content -------

const importAndInsertLines: ImportAndSetInMapStatements = 
  usedDaysOfMonth.reduce<ImportAndSetInMapStatements>((acc, dayOfMonth) => {
    acc.importStatements.push(createImportDayScriptsStatement(dayOfMonth));
    acc.setInMapStatements.push(createSetDayScriptsInMapStatement(dayOfMonth));
    return acc;
  }, {
    importStatements: [],
    setInMapStatements: []
  });

let importAndSetStatementsSectionLines: string[] = [];
importAndSetStatementsSectionLines.push(importAndSetInMapStatementsSectionHeader);
importAndSetStatementsSectionLines.push('');

importAndSetStatementsSectionLines = importAndSetStatementsSectionLines.concat(importAndInsertLines.importStatements);
importAndSetStatementsSectionLines.push('');

importAndSetStatementsSectionLines = importAndSetStatementsSectionLines.concat(importAndInsertLines.setInMapStatements);
importAndSetStatementsSectionLines.push('');

const importAndSetStatementsSectionContent = importAndSetStatementsSectionLines.join('\n');

// ------- Create and fill dayScripts.ts file -------

if (!FileOrDirExists(dayScriptsFileURL.href)) {
  const dayScriptsTemplateFileURL = new URL('dayScripts.ts', daysTemplateFolderURL);
  Deno.copyFileSync(dayScriptsTemplateFileURL.href, dayScriptsFileURL.href);  
}

const dayScriptsContent = Deno.readTextFileSync(dayScriptsFileURL.href);
const indexOfImportAndSetInMapStatementsSectionHeader = dayScriptsContent.indexOf(importAndSetInMapStatementsSectionHeader);
const hasImportAndSetInMapStatementsSection = (indexOfImportAndSetInMapStatementsSectionHeader >= 0);
if (hasImportAndSetInMapStatementsSection) {
  const dayScriptsContentWithSection = dayScriptsContent.substring(0, indexOfImportAndSetInMapStatementsSectionHeader);
  Deno.writeTextFileSync(dayScriptsFileURL.href, dayScriptsContentWithSection + importAndSetStatementsSectionContent, {
    create: true,
    append: false
  });
} else {
  Deno.writeTextFileSync(dayScriptsFileURL.href, dayScriptsContent + importAndSetStatementsSectionContent, {
    create: true,
    append: false
  });
}