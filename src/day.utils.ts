export const createDayFolderName = (dayOfMonth: number) => `Day-${dayOfMonth}/`;
export const createDayFolderURL = (daysFolderURL: URL, dayNumber: number): URL => new URL(createDayFolderName(dayNumber), daysFolderURL);
