import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { ForeignTicket, ForeignTicketField, getNotesFromInput, valueInRanges } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const notes = getNotesFromInput(input);


  const { TicketFields, NearbyTickets } = notes;

  const invalidTicketValues: number[] = NearbyTickets
    .map(nearbyTicket => getInvalidTicketValues(nearbyTicket, TicketFields))
    .reduce((invalidValues: number[], ticketValues: number[]) => invalidValues.concat(ticketValues));

  return `Ticket scanning error rate: ${invalidTicketValues.reduce((sum: number, value: number) => sum += value, 0)}`;
};

const getInvalidTicketValues = (ticket: ForeignTicket, foreignTicketFields: ForeignTicketField[]): number[] => {
  return ticket.Values.filter((value) => {
    for (const foreignTicketField of foreignTicketFields) {
      if (valueInRanges(value, foreignTicketField.ValueRanges))
        return false;
    }

    return true;
  });
}