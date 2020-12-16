import { getInputLinesTrimAndFilterEmpty, mapToInteger, trimAndFilter } from "../shared.ts";

export type ForeignTicketFieldValueRange = {
  Min: number,
  Max: number
}

export type ForeignTicketField = {
  Name: string,
  ValueRanges: ForeignTicketFieldValueRange[]
}

export type ForeignTicket = {
  Values: number[]
}

type ForeignTrainStationNotes = {
  TicketFields: ForeignTicketField[],
  YourTicket: ForeignTicket,
  NearbyTickets: ForeignTicket[]
}

export const valueInRanges = (value: number, valueRanges: ForeignTicketFieldValueRange[]): boolean => {
  for (const valueRange of valueRanges) {
    if (valueInRange(value, valueRange))
      return true;
  }

  return false;
};

export const valueInRange = (value: number, valueRange: ForeignTicketFieldValueRange): boolean => {
  const { Max, Min } = valueRange;

  if (value < Min) return false;
  if (value > Max) return false;
  return true;
};

export const getNotesFromInput = (input: string): ForeignTrainStationNotes => {
  const TicketFields: ForeignTicketField[] = [];
  let YourTicket: ForeignTicket | undefined = undefined;
  const NearbyTickets: ForeignTicket[] = [];

  const inputLines = getInputLinesTrimAndFilterEmpty(input);

  const getTicketFieldRegExp = /([A-Za-z]+):\s*(\d+)-(\d+)\s*or*\s*(\d+)-(\d+)/

  const getTicketFieldProcessor = (OnGetTicketField: { (field: ForeignTicketField): void }): { (line: string): void } => (line: string): void => {
    const regRes = getTicketFieldRegExp.exec(line);

    if (regRes && (regRes.length > 5)) {
      const lowerValueRange: ForeignTicketFieldValueRange = {
        Min: parseInt(regRes[2], 10),
        Max: parseInt(regRes[3], 10),
      }

      const upperValueRange: ForeignTicketFieldValueRange = {
        Min: parseInt(regRes[4], 10),
        Max: parseInt(regRes[5], 10),
      }

      const ticketField: ForeignTicketField = {
        Name: regRes[1].trim(),
        ValueRanges: [lowerValueRange, upperValueRange]
      };

      OnGetTicketField(ticketField);
    }
  };

  const getTicketProcessor = (OnGetTicket: { (ticket: ForeignTicket): void }): { (line: string): void } => (line: string): void => {
    const Values = trimAndFilter(line.split(',')).map(mapToInteger(10));
    if (Values.length > 0) {
      OnGetTicket({
        Values
      });
    }
  };

  let nextLineProcessor: { (line: string): void } = getTicketFieldProcessor((field: ForeignTicketField) => TicketFields.push(field));

  for (let i = 0; i < inputLines.length; i++) {
    const inputLine = inputLines[i];

    if (inputLine.toLocaleLowerCase().startsWith('your ticket')) {
      nextLineProcessor = getTicketProcessor((yourTicket: ForeignTicket) => (YourTicket = yourTicket));
      continue;
    }

    if (inputLine.toLocaleLowerCase().startsWith('nearby tickets')) {
      nextLineProcessor = getTicketProcessor((nearybyTicket: ForeignTicket) => NearbyTickets.push(nearybyTicket));
      continue;
    }

    nextLineProcessor(inputLine);
  }

  if (TicketFields.length === 0)
    throw new Error('No ticket fields found');

  if (YourTicket === undefined)
    throw new Error('No your ticket information found');

  if (NearbyTickets.length === 0)
    throw new Error('No nearby tickets found');

  return {
    TicketFields,
    YourTicket,
    NearbyTickets
  };
}