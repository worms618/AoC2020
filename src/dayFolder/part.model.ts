import { Path } from "https://deno.land/x/path/mod.ts";

import { 
  createDayPartScriptFilePath,
  createDayPartInputFilePath,
  writeTextFileSync
} from "../utils.ts";

export class DayPartFiles {
  private scriptFilePath: Path;
  private inputFilePath: Path;

  constructor(private rootFolderPath: Path, private partNumber: number) {
    this.scriptFilePath = createDayPartScriptFilePath(this.rootFolderPath, this.partNumber);
    this.inputFilePath = createDayPartInputFilePath(this.rootFolderPath, this.partNumber);
  }

  mkSync(scriptContentTemplate: string, inputContentTemplate: string): void {
    if (!this.scriptFilePath.exists) {
      writeTextFileSync(this.scriptFilePath, scriptContentTemplate, {
        append: false,
        create: true
      });  
    }

    if (!this.inputFilePath.exists) {
      writeTextFileSync(this.inputFilePath, inputContentTemplate, {
        append: false,
        create: true
      });  
    }
  };
};