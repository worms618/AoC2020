import {Path, WINDOWS_SEPS} from "https://deno.land/x/path/mod.ts";

const rootFolder = Deno.cwd();

export const writeTextFileSync = (path: Path, data: string, options?: Deno.WriteFileOptions): void => {
  Deno.writeTextFileSync(path.toString(), data, options);
};

export const readTextFileSync = (path: Path): string => {
  return Deno.readTextFileSync(path.toString());
}

export const readDirSync = (path: Path): Iterable<Deno.DirEntry> => {
  return Deno.readDirSync(path.toString());
}

export const copyFileSync = (fromPath: Path, toPath: Path): void => {
  Deno.copyFileSync(fromPath.toString(), toPath.toString());
}

export const combineToPath = (baseFolder: string, folder: string): Path => new Path(`${baseFolder}/${folder}`, WINDOWS_SEPS);

export const createFolderPathInRootFolder = (folderName: string): Path => combineToPath(rootFolder, folderName);