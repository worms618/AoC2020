import { DayScriptExecutor } from "../../src/day/day.types.ts";
import { applyMask, getMasksWithMemAssignments, sumTotalNonEmptyValues } from "./shared.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const masksWithMemAssignments = getMasksWithMemAssignments(input);

  const mem = new Map<string, string>();

  for (let i = 0; i < masksWithMemAssignments.length; i++) {
    const { mask, assignments } = masksWithMemAssignments[i];

    for (let j = 0; j < assignments.length; j++) {
      const { address, binaryValue } = assignments[j];
      const binaryAddress = address.toString(2);

      assignValue(mask, binaryAddress, binaryValue, mem);
    }
  }

  let sumOfValues = sumTotalNonEmptyValues(mem);

  return `${sumOfValues}`;
};

const assignValue = (mask: string, address: string, binaryValue: string, mem: Map<string, string>): void => {
  getAddresses(mask, address).forEach((adres) => {
    mem.set(adres, binaryValue);
  })
};

const getAddresses = (mask: string, baseAdres: string): string[] => {
  const totalFloat = Array.from(mask).filter(char => char === 'X').length;
  const floatableAddress = applyMaskOverAddress(mask, baseAdres);

  let shift = 0;

  const addresses: string[] = [];
  while(shift < Math.pow(2, totalFloat)) {
    addresses.push(applyShiftOnAddress(shift.toString(2), floatableAddress));
    shift++;
  }

  return addresses;
}

const applyMaskOverAddress = (mask: string, baseAdres: string): string => {
  const maskCopy = Array.from(mask).reverse();
  const valueCopy = Array.from(baseAdres).reverse();

  let res = Array.from(maskCopy);

  for (let i = 0; i < maskCopy.length; i++) {
    const maskChar = maskCopy[i];

    if (maskChar === 'X') {
      res[i] = maskChar;
    } else {
      let valueChar = '0';

      if (i < valueCopy.length)
        valueChar = valueCopy[i];

      if (maskChar === '1') res[i] = maskChar;
      else res[i] = valueChar;
    }
  }

  return res.reverse().join('');
}

const applyShiftOnAddress = (shift: string, floatableAddress: string): string => {
  let shiftChars = Array.from(shift);
  let address = '';

  for (let i = 0; i < floatableAddress.length; i++) {
    const fac = floatableAddress[i];

    if (fac === 'X') {
      if (shiftChars.length > 0) {
        address += shiftChars.pop();
      } else {
        address += '0';
      }
    } else {
      address += fac;
    }
  }

  return address;
}