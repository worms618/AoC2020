import { DayScriptExecutor } from "../../src/day/day.types.ts";
import { ForeignTicket, ForeignTicketField, getNotesFromInput, ticketIsValid, valueInRanges } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const notes = getNotesFromInput(input);

  const { TicketFields, NearbyTickets, YourTicket } = notes;

  const validNearbyTickets: ForeignTicket[] = NearbyTickets.filter(nearbyTicket => ticketIsValid(nearbyTicket, TicketFields));

  // Make sets of all the values of the n-th value column
  const ValuesPerColumn = validNearbyTickets.reduce((valuesPerColumn: number[][], ticket: ForeignTicket) => {
    ticket.Values.forEach((value, index) => {
      if (valuesPerColumn.length <= index)
        valuesPerColumn.push([value]);
      else
        valuesPerColumn[index].push(value);
    });

    return valuesPerColumn;
  }, []);

  let fieldsForValueIndex: {field: ForeignTicketField, valueIndex: number}[] = [];

  // Gather all ticketFields that match for the value column (Found this part after some looking for help)
  TicketFields.forEach(field => {
    for (let i = 0; i < ValuesPerColumn.length; i++) {
      const values = ValuesPerColumn[i];

      if (values.length === 0) continue;

      let allValuesInRange = true;
      for (const value of values) {
        if (!valueInRanges(value, field.ValueRanges)) {
          allValuesInRange = false;
          break;
        }
      }

      if (allValuesInRange) {
        fieldsForValueIndex.push({
          field,
          valueIndex: i
        })
      }
    }
  });

  // Did not invent this myself, found some help
  // So, what I think this does: Filter out the possible ticketField for value column until one is left for every column
  while (fieldsForValueIndex.length > TicketFields.length) {
    for (let i = 0; i < YourTicket.Values.length; i++) {
      const fieldsForCurrentValueIndex = fieldsForValueIndex.filter(f => f.valueIndex === i);

      if (fieldsForCurrentValueIndex.length === 1) {
        const currentFieldForValueIndex = fieldsForCurrentValueIndex[0];
        
        fieldsForValueIndex = fieldsForValueIndex.filter(fieldForValueIndex => {
          if (fieldForValueIndex.field.Name === currentFieldForValueIndex.field.Name) {
            return fieldForValueIndex.valueIndex === currentFieldForValueIndex.valueIndex;
          }

          return true;
        });
      }
    }
  }

  let departureFieldValuesMultiplied = 1;

  fieldsForValueIndex
    .filter(fieldForValueIndex => fieldForValueIndex.field.Name.startsWith('departure'))
    .forEach(fieldForValueIndex => departureFieldValuesMultiplied *= YourTicket.Values[fieldForValueIndex.valueIndex]);

  return `Total multiplication value of the departure field values: ${departureFieldValuesMultiplied}`;
};