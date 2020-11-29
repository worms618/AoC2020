import { Path, WINDOWS_SEPS } from "https://deno.land/x/path/mod.ts";

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

export const deepCopyDirectory = (fromDir: string | URL, toDir: string | URL): void => {
  for (const dirEntry of Deno.readDirSync(fromDir)) {
    const entryFromURL = new URL(dirEntry.name, fromDir);
    const entryToURL = new URL(dirEntry.name, toDir);

    if (dirEntry.isFile) {
      Deno.copyFileSync(entryFromURL.pathname, entryToURL.pathname);
    } else if (dirEntry.isDirectory) {
      Deno.mkdirSync(entryToURL);
      deepCopyDirectory(entryFromURL, entryToURL);
    }
  }
}

export const combineToPath = (baseFolder: string, folder: string): Path => new Path(`${baseFolder}/${folder}`, WINDOWS_SEPS);

export const createFolderPathInRootFolder = (folderName: string): Path => combineToPath(rootFolder, folderName);