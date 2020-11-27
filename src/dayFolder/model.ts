import { Path } from "https://deno.land/x/path/mod.ts";

import {
  createDayFolder
} from "../utils.ts";

import { DayPartFiles } from "./part.model.ts";

export class DayFolderModel {
  private folderPath: Path;
  private partOneFiles: DayPartFiles;
  private partTwoFiles: DayPartFiles;

  constructor(private dayOfMonth: number) {
    this.folderPath = createDayFolder(this.dayOfMonth);
    this.partOneFiles = new DayPartFiles(this.folderPath, 1);
    this.partTwoFiles = new DayPartFiles(this.folderPath, 2);
  }

  public get PartOneFiles(): DayPartFiles {
    return this.partOneFiles;
  }

  public get PartTwoFiles(): DayPartFiles {
    return this.partTwoFiles;
  }

  mkSync(partTemplateContent: string): void {
    if (!this.folderPath.exists)
      this.folderPath.mkDirSync();

    this.partOneFiles.mkSync(partTemplateContent, '');
    this.partTwoFiles.mkSync(partTemplateContent, '');
  }

  exists(): boolean {
    return this.folderPath.exists;
  }
}