export type Policy = {
  min: number,
  max: number,
  char: string
}

export type PolicyAndPassword = {
  policy: Policy,
  password: string
}


export const getPolicyAndPasswordOfLine = (line: string): PolicyAndPassword => {
  const details = line.split(':').map(value => value.trim());

  return {
    policy: getPolicy(details[0]),
    password: details[1]
  }
}

export const getPolicy = (value: string): Policy => {
  const details = value.split(' ').map(value => value.trim());

  const constraints = details[0].split('-').map(value => parseInt(value.trim()));
  const char = details[1];

  return {
    min: constraints[0],
    max: constraints[1],
    char
  }
}