import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

type MemAssignment = {
  address: number,
  decimalValue: number,
  binaryValue: string
};

type MaskWithMemAssignments = {
  mask: string,
  assignments: MemAssignment[]
};

export const executor: DayScriptExecutor = (input: string): string => {
  const lines = getInputLinesTrimAndFilterEmpty(input);

  const masksWithMemAssignments: MaskWithMemAssignments[] = [];

  const getMaskValueRegExp = /mask\s*=\s*(.*)/;
  const getMemAssignmentRegExp = /mem\[(.*)\]\s*=\s*(.*)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('mask')) {
      const maskRegRes = getMaskValueRegExp.exec(line);

      if (maskRegRes && (maskRegRes.length > 1)) {
        const mask = maskRegRes[1].trim();

        const newMaskWithMemAssignements = {
          mask,
          assignments: []
        }

        masksWithMemAssignments.push(newMaskWithMemAssignements);
      } else {
        throw new Error(`Could not get mask values at index: ${i}; ${line}`);
      }
    } else {
      const memAssignmentRegRes = getMemAssignmentRegExp.exec(line);

      if (memAssignmentRegRes && (memAssignmentRegRes.length > 2)) {
        if (masksWithMemAssignments.length === 0) continue;

        const address = parseInt(memAssignmentRegRes[1], 10);
        const decimalValue = parseInt(memAssignmentRegRes[2], 10);
        const binaryValue = decimalValue.toString(2);

        const memAssignment: MemAssignment = {
          address,
          decimalValue,
          binaryValue
        };

        masksWithMemAssignments[masksWithMemAssignments.length - 1].assignments.push(memAssignment);
      } else {
        throw new Error(`Could not get mem assignment values at index: ${i}; ${line}`);
      }
    }
  }

  const mem = new Map<number, string>();

  for (let i = 0; i < masksWithMemAssignments.length; i++) {
    const { mask, assignments } = masksWithMemAssignments[i];

    for (let j = 0; j < assignments.length; j++) {
      const { address, binaryValue } = assignments[j];
      const value = applyMask(mask, binaryValue);

      mem.set(address, value);
    }
  }

  let sumOfValues = 0;
  for (const [address, value] of mem.entries()) {
    const decimalValue = parseInt(value, 2);
    if (decimalValue > 0)
      sumOfValues += decimalValue;
  }

  return `${sumOfValues}`;
};

/**
 * 
 * @param mask Its length is the amount of bits that will be checked
 * @param value value to apply mask over
 */
function applyMask(mask: string, value: string): string {
  const maskCopy = Array.from(mask).reverse();
  const valueCopy = Array.from(value).reverse();

  let res = Array.from(maskCopy);

  for (let i = 0; i < maskCopy.length; i++) {
    const maskChar = maskCopy[i];

    if (maskChar !== 'X') {
      res[i] = maskChar;
    } else {
      let valueChar = '0';

      if (i < valueCopy.length)
        valueChar = valueCopy[i];

      res[i] = valueChar;
    }
  }

  return res.reverse().join('');
}