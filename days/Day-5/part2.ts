import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getBoardingPasses, getSeatInfo, SeatInfo, getSeatId } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const foundSeats = getBoardingPasses(input)
    .map(getSeatInfo);

  const missingSeatInfo: SeatInfo = getMissingSeatInfo(8, foundSeats);

  return `Missing seat at row: [${missingSeatInfo.RowNumber}] and column: [${missingSeatInfo.ColumnNumber}] with id: ${getSeatId(missingSeatInfo)}`
};

const getMissingSeatInfo = (maxColumnsPerRow: number, foundSeats: SeatInfo[]): SeatInfo => {
  const allFoundRowsWithFoundColumns: Map<number, number[]> = new Map<number, number[]>();

  foundSeats.forEach(foundSeat => {
    const { RowNumber, ColumnNumber } = foundSeat;

    if (!allFoundRowsWithFoundColumns.has(RowNumber)) {
      allFoundRowsWithFoundColumns.set(RowNumber, []);
    }

    const foundColumnsForRow = allFoundRowsWithFoundColumns.get(RowNumber);
    if (foundColumnsForRow) {
      foundColumnsForRow.push(ColumnNumber);
    } else {
      throw new Error(`No columns array found for row: ${RowNumber}`);
    }
  });

  //"some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well"
  //Remove lowest and highest row number from all found rows
  const allRowNumbersSorted = Array.from(allFoundRowsWithFoundColumns.keys()).sort((a: number, b: number) => a - b);
  const foundRowsWithoutLowestAndHighestRow = new Map<number, number[]>(allFoundRowsWithFoundColumns.entries());
  foundRowsWithoutLowestAndHighestRow.delete(allRowNumbersSorted[0]);
  foundRowsWithoutLowestAndHighestRow.delete(allRowNumbersSorted[allRowNumbersSorted.length - 1]);
  let missingSeat: SeatInfo | undefined = undefined;

  foundRowsWithoutLowestAndHighestRow.forEach((foundColums: number[], rowNumber: number) => {
    if (foundColums.length < maxColumnsPerRow) {
      for (let c = 0; c < maxColumnsPerRow; c++) {
        if (foundColums.indexOf(c) < 0) {
          if (missingSeat) {
            throw new Error(`First missing seat: ${JSON.stringify(missingSeat)}, other found at: ${JSON.stringify({ RowNumber: rowNumber, ColumnNumber: c })}`);
          }

          missingSeat = {
            RowNumber: rowNumber,
            ColumnNumber: c
          }
          break;
        }
      }
    }
  });

  if (missingSeat)
    return missingSeat;

  throw new Error(`No missing seat found`);
};