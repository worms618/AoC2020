const getFieldWithValueRegExp: RegExp = /(.*)\s*:\s*(.*)/;

type FieldWithValue = {
  field: string,
  value: string
};

const valueInRange = (value: number, min: number, max: number): boolean => {
  return (value >= min) && (value <= max);
}

const fourDigitsRegExp: RegExp = /[0-9]{4}$/;
const fourDigitsInRange = (input: string, min: number, max: number): boolean => {
  const regResult = fourDigitsRegExp.exec(input);
  if (regResult && (regResult.length > 0)) {
    const value = parseInt(regResult[0], 10);

    return valueInRange(value, min, max);
  }
  return false;
};

const digitsBeforeCMOrIN: RegExp = /([0-9]+)(cm|in)/;
const units = ['cm', 'in'];
const unitsConstraints: { min: number, max: number }[] = [
  {
    min: 150,
    max: 193
  },
  {
    min: 59,
    max: 76
  }
];

const isValidHeight = (input: string): boolean => {
  const regResult = digitsBeforeCMOrIN.exec(input);
  if (regResult && (regResult.length > 2)) {
    const value = parseInt(regResult[1], 10);
    const valueUnit = regResult[2];

    const valueUnitIndex = units.indexOf(valueUnit);
    const unitConstraints = unitsConstraints[valueUnitIndex];

    return valueInRange(value, unitConstraints.min, unitConstraints.max);
  }
  return false;
}

const hexDecimalColorCodeRegEx: RegExp = /#[0-9a-f]{6}$/;
const isValidHexdecimalColor = (input: string): boolean => {
  const regResult = hexDecimalColorCodeRegEx.exec(input);

  if (regResult) {
    if (regResult[0].length !== 7)
      throw new Error(`Not exact # and six alfanum characters: [${input}]`);

    return (regResult.length > 0);
  }
  return false;
};

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const isValidEyeColor = (input: string) => {
  return eyeColors.indexOf(input) >= 0;
};

const nineDigitWithLeadingZeroRegex: RegExp = /[0-9]{9}$/;
const isExactNineDigitWithLeadingZero = (input: string) => {
  const regResult = nineDigitWithLeadingZeroRegex.exec(input);

  if (regResult) {
    if (regResult[0].length !== 9)
      throw new Error(`Not exact nine digit: [${input}]`);
    return (regResult.length > 0);
  }
  return false;
}

const requiredFields: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const requiredFieldsValidators: { (input: string): boolean }[] = [
  (input: string): boolean => fourDigitsInRange(input, 1920, 2002),
  (input: string): boolean => fourDigitsInRange(input, 2010, 2020),
  (input: string): boolean => fourDigitsInRange(input, 2020, 2030),
  isValidHeight,
  isValidHexdecimalColor,
  isValidEyeColor,
  isExactNineDigitWithLeadingZero
];

export const getPassportsLines = (input: string): string[][] => {
  const inputLines = input
    .split('\n')
    .map(line => line.trim());

  const passportsLines: string[][] = [];

  let passportLines: string[] = [];
  for (const inputLine of inputLines) {
    if (inputLine.length > 0)
      passportLines.push(inputLine)
    else {
      passportsLines.push(passportLines);
      passportLines = [];
    }
  }

  passportsLines.push(passportLines);

  return passportsLines;
}

export const createPassportFieldsLine = (passportLines: string[]): string => {
  return passportLines.join(' ');
};

export const passportHasRequiredFields = (passportFieldsLine: string): boolean => {
  //Check if the part with colon is present in passportParts, which is 1 line with all the passportparts
  return requiredFields.filter(reqPart => passportFieldsLine.indexOf(`${reqPart}:`) < 0).length === 0;
}

export const passportFieldsAreValid = (passportFieldsLine: string): boolean => {
  return passportFieldsLine
    .split(' ')
    .map(getFieldWithValue)
    .filter(isRequiredField)
    .filter(requiredFieldHasInvalidValue)
    .length === 0;
}

export const getFieldWithValue = (rawFieldWithValue: string): FieldWithValue => {
  const regexResult = getFieldWithValueRegExp.exec(rawFieldWithValue);

  if (regexResult && (regexResult.length > 2)) {
    return {
      field: regexResult[1].trim(),
      value: regexResult[2].trim()
    }
  }
  throw new Error(`Argument rawFieldWithValue has invalid syntax: [${rawFieldWithValue}]`);
};

export const isRequiredField = (fieldWithValue: FieldWithValue): boolean => {
  return requiredFields.indexOf(fieldWithValue.field) >= 0;
}

export const requiredFieldHasInvalidValue = (fieldWithValue: FieldWithValue): boolean => {
  const { field, value } = fieldWithValue;

  const fieldIndex = requiredFields.indexOf(field);
  const validator = requiredFieldsValidators[fieldIndex];

  const validatorRes = validator(value);
  return (validatorRes === false);
}