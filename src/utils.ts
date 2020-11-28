import {Path, WINDOWS_SEPS} from "https://deno.land/x/path/mod.ts";

const rootFolder = Deno.cwd();

export const writeTextFileSync = (path: Path, data: string, options?: Deno.WriteFileOptions): void => {
  Deno.writeTextFileSync(path.toString(), data, options);
};

export const combineToPath = (baseFolder: string, folder: string): Path => new Path(`${baseFolder}/${folder}`, WINDOWS_SEPS);

export const createFolderPathInRootFolder = (folderName: string): Path => combineToPath(rootFolder, folderName);