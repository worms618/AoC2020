import { Path } from "https://deno.land/x/path/mod.ts";

import {
  createDayFolderPath
} from "./utils.ts";

import { DayPartStructure } from "./structure.part.ts";

export class DayFolderStructure {
  private dayFolderPath: Path;
  private part1Structure: DayPartStructure;
  private part2Structure: DayPartStructure;

  constructor(private daysFolderPath: Path, private dayOfMonth: number) {
    this.dayFolderPath = createDayFolderPath(this.daysFolderPath, this.dayOfMonth);
    this.part1Structure = new DayPartStructure(this.dayFolderPath, 1);
    this.part2Structure = new DayPartStructure(this.dayFolderPath, 2);
  }

  public get Part1Structure(): DayPartStructure {
    return this.part1Structure;
  }

  public get Part2Structure(): DayPartStructure {
    return this.part2Structure;
  }

  mkSync(): void {
    if (!this.dayFolderPath.exists)
      this.dayFolderPath.mkDirSync();

    this.part1Structure.mkSync();
    this.part2Structure.mkSync();
  }
}