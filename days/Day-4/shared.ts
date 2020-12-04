const requiredFields: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

type FieldWithValue = {
  field: string,
  value: string
};

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
}

export const passportHasRequiredFields = (passportFieldsLine: string): boolean => {
  //Check if the part with colon is present in passportParts, which is 1 line with all the passportparts
  return requiredFields.filter(reqPart => passportFieldsLine.indexOf(`${reqPart}:`) < 0).length === 0;
}

export const passportFieldsAreValid = (passportWithRequiredFields: string): boolean => {
  const fieldsWithValue = passportWithRequiredFields
    .split(' ')
    .map(getFieldWithValue)
    .filter(isRequiredField);

  const allFieldsAreValidValue = DoAllFieldsHaveValidValue(fieldsWithValue);
  return allFieldsAreValidValue;
};

const getFieldWithValueRegExp = /(.*):(.*)/;
export const getFieldWithValue = (rawFieldWithValue: string): FieldWithValue => {
  const regRes = getFieldWithValueRegExp.exec(rawFieldWithValue);

  if (regRes && (regRes.length > 2)) {
    return {
      field: regRes[1].trim(),
      value: regRes[2].trim()
    }
  }
  throw new Error(`Argument rawFieldWithValue invalid syntax: [${rawFieldWithValue}]`);
}

export const isRequiredField = (fieldWithValue: FieldWithValue) => {
  return requiredFields.indexOf(fieldWithValue.field) >= 0;
}

export const DoAllFieldsHaveValidValue = (fieldsWithValue: FieldWithValue[]): boolean => {
  //Filter out valid fields, if no fields remain then all fields are valid
  return fieldsWithValue
    .filter(fieldWithValue => !fieldHasValidValue(fieldWithValue))
    .length === 0;
}

export const fieldHasValidValue = (fieldWithValue: FieldWithValue): boolean => {
  const { field, value } = fieldWithValue;

  const fieldIndex = requiredFields.indexOf(field);

  if (fieldIndex < fieldValidators.length) {
    const fieldValidator = fieldValidators[fieldIndex];
    return fieldValidator(value);
  }
  return true;
}

const fourDigitsRegExp = /^[0-9]{4}$/;
const getFourDigits = (input: string): number => {
  const regRes = fourDigitsRegExp.exec(input);
  if (regRes && (regRes.length > 0)) {
    return parseInt(regRes[0].trim(), 10);
  }
  throw new Error(`No four digits found for input [${input}]`);
}

const valueInRange = (value: number, min: number, max: number): boolean => {
  return (value >= min) && (value <= max);
}

const fourDigitsInRange = (value: string, min: number, max: number): boolean => {
  try {
    const fourDigits = getFourDigits(value);
    return valueInRange(fourDigits, min, max);
  } catch (err) {
    return false;
  }
}

const validateBirthYear = (input: string): boolean => fourDigitsInRange(input, 1920, 2002);
const validateIssueYear = (input: string): boolean => fourDigitsInRange(input, 2010, 2020);
const validateExpirationYear = (input: string): boolean => fourDigitsInRange(input, 2020, 2030);

const getHeightInfoRegExp: RegExp = /^([0-9]+)(cm|in)$/;
const getHeightInfo = (input: string): { value: number, unit: string } => {
  const regRes = getHeightInfoRegExp.exec(input);

  if (regRes && (regRes.length > 2)) {
    return {
      value: parseInt(regRes[1].trim(), 10),
      unit: regRes[2].trim()
    }
  }
  throw new Error(`No height data found: [${input}]`);
};

const heightPerUnitConstraints = {
  'cm': { min: 150, max: 193 },
  'in': { min: 59, max: 76 }
};
const heightInRange = (height: number, unit: string): boolean => {
  let constraints = { min: -1, max: -1 };

  if (unit === 'cm') {
    constraints = heightPerUnitConstraints.cm;
  }
  else if (unit === 'in') {
    constraints = heightPerUnitConstraints.in;
  }
  else {
    throw new Error(`No unit constraints found for: [${unit}]`)
  }

  return valueInRange(height, constraints.min, constraints.max);
};

const validateHeight = (input: string): boolean => {
  try {
    const heightInfo = getHeightInfo(input);
    return heightInRange(heightInfo.value, heightInfo.unit);
  } catch (err) {
    return false;
  }
};

const getHairColorInfoRegExp: RegExp = /^#[0-9a-f]{6}$/;
const getHairColorInfo = (value: string): string => {
  const regRes = getHairColorInfoRegExp.exec(value);
  if (regRes && (regRes.length > 0)) {
    return regRes[0].trim();
  }
  throw new Error(`No hair color info found in: [${value}]`);
}
const validateHairColor = (input: string): boolean => {
  try {
    const hairColor = getHairColorInfo(input);
    //#-sign with 6 characters
    return hairColor.length === 7;
  } catch (err) {
    return false;
  }
};

const validEyeColors: string[] = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const validateEyeColor = (input: string): boolean => {
  return (validEyeColors.indexOf(input) >= 0);
};

const getPassportIdRegExp: RegExp = /^[0-9]{9}$/;
const getPassportId = (value: string): string => {
  const regRes = getPassportIdRegExp.exec(value);

  if (regRes && (regRes.length > 0)) {
    return regRes[0].trim();
  }
  throw new Error(`No passport id found for value: [${value}]`);
};
const validatePassportId = (input: string): boolean => {
  try {
    const passportId = getPassportId(input);
    //Exact 9 characters
    return passportId.length === 9;
  } catch (err) {
    return false;
  }
}

// ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const fieldValidators: ({ (input: string): boolean })[] = [
  validateBirthYear,
  validateIssueYear,
  validateExpirationYear,
  validateHeight,
  validateHairColor,
  validateEyeColor,
  validatePassportId
];
