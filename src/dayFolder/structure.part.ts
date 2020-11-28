import { Path } from "https://deno.land/x/path/mod.ts";

import { writeTextFileSync } from "../utils.ts";

import { 
  createDayPartScriptFilePath,
  createDayPartInputFilePath
} from "./utils.ts";

export class DayPartStructure {
  private scriptFilePath: Path;
  private inputFilePath: Path;

  constructor(private dayFolderPath: Path, private partNumber: number) {
    this.scriptFilePath = createDayPartScriptFilePath(this.dayFolderPath, this.partNumber);
    this.inputFilePath = createDayPartInputFilePath(this.dayFolderPath, this.partNumber);
  }

  public get ScriptFilePath(): Path {
    return this.scriptFilePath;
  }
  
  public get InputFilePath(): Path {
    return this.inputFilePath;
  }

  mkSync(): void {
    if (!this.scriptFilePath.exists) {
      writeTextFileSync(this.scriptFilePath, '', {
        append: false,
        create: true
      });  
    }

    if (!this.inputFilePath.exists) {
      writeTextFileSync(this.inputFilePath, '', {
        append: false,
        create: true
      });  
    }
  };
};