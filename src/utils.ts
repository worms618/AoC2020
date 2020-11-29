/**
 * 
 * requires: --allow-read, --allow-write flags
 */
export const DeepCopyDirectory = (fromDir: string | URL, toDir: string | URL): void => {
  for (const dirEntry of Deno.readDirSync(fromDir)) {
    const entryFromURL = new URL(dirEntry.name, fromDir);
    const entryToURL = new URL(dirEntry.name, toDir);

    if (dirEntry.isFile) {
      // Providing "entryFromURL" and "entryToURL" as argument throws error => TypeError: Must be a file URL
      Deno.copyFileSync(entryFromURL.href, entryToURL.href);
    } else if (dirEntry.isDirectory) {
      Deno.mkdirSync(entryToURL);
      DeepCopyDirectory(entryFromURL, entryToURL);
    }
  }
}

/**
 * Checks if the path exists
 * ```ts
 * const path = new Path("/home/test/text.txt");
 * path.exists;
 * ```
 * requires: --allow-read flag
 */
export const FileOrDirExists = (path: string | URL): boolean => {
  try {
    Deno.statSync(path);
    return true;
  } catch (e) {
    // do not hide permission errors from the user
    if (e instanceof Deno.errors.PermissionDenied) {
      throw e;
    }
    return false;
  }
}

const rootFolder = Deno.cwd();
const rootFolderURL = new URL(rootFolder + '/');
export const CreatePathURLWithBaseRootFolder = (path: string): URL => new URL(path, rootFolderURL);