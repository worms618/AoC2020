export type ParsedInput = {
  min: number;
  max: number;
  char: string;
  password: string;
};

export const getBySplitting = (line: string): ParsedInput => {
  const splitPolicyAndPassword = line.split(':').map(value => value.trim());
  const policyDetails = splitPolicyAndPassword[0].split(' ').map(value => value.trim());
  const minAndMax = policyDetails[0].split('-').map(value => parseInt(value.trim()));

  return {
    min: minAndMax[0],
    max: minAndMax[1],
    char: policyDetails[1],
    password: splitPolicyAndPassword[1]
  };
}

export const getByRegExp = (line: string): ParsedInput => {
  const parsedInputRegex: RegExp = /(\d+)-(\d+)\s*([a-z])\s*:\s*([a-z]+)/gm;
  const minimumResults = 5;

  const regResults = parsedInputRegex.exec(line);

  if (regResults) {
    if (regResults.length < minimumResults)
      throw new Error(`No enough results ([${regResults.length}] should be atleast ${minimumResults}) found for argument line ${line}`);

    return {
      min: parseInt(regResults[1], 10),
      max: parseInt(regResults[2], 10),
      char: regResults[3],
      password: regResults[4]
    }
  } else {
    throw new Error(`Invalid syntax for argument line ${line}`);
  }
};