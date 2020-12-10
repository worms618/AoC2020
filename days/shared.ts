export const getInputLinesTrimAndFilterEmpty = (input: string): string[] => {
  return input.split('\n').map(line => line.trim()).filter(line => line);
}

export const mapToInteger = (radix?: number | undefined): { (value: string): number } => (value: string): number => parseInt(value, radix);

export const sortNumberAsc = (a: number, b: number) => a - b;