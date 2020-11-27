import { Path } from "https://deno.land/x/path/mod.ts";

import {
  createDayFolder,
  createInputFolderInDayFolder,
  createDayPartOneFilePath,
  createDayPartTwoFilePath,
  writeTextFileSync
} from "../../src/utils.ts";

export class DayFolder {
  private folderPath: Path;
  private inputFolderPath: Path;
  private partOneFilePath: Path;
  private partTwoFilePath: Path;

  constructor(private dayOfMonth: number) {
    this.folderPath = createDayFolder(this.dayOfMonth);
    this.inputFolderPath = createInputFolderInDayFolder(this.dayOfMonth);
    this.partOneFilePath = createDayPartOneFilePath(this.dayOfMonth);
    this.partTwoFilePath = createDayPartTwoFilePath(this.dayOfMonth);
  }

  mkSync(partTemplateContent: string): void {
    if (!this.folderPath.exists)
      this.folderPath.mkDirSync();
    
    if (!this.inputFolderPath.exists)
      this.inputFolderPath.mkDirSync();

    if (!this.partOneFilePath.exists) {
      writeTextFileSync(this.partOneFilePath, partTemplateContent, {
        append: false,
        create: true
      });  
    }

    if (!this.partTwoFilePath.exists) {
      writeTextFileSync(this.partTwoFilePath, partTemplateContent, {
        append: false,
        create: true
      });  
    }
  }
}