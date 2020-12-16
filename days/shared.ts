export const getInputLinesTrimAndFilterEmpty = (input: string): string[] => {
  return trimAndFilter(input.split('\n'));
}

export const mapToInteger = (radix?: number | undefined): { (value: string): number } => (value: string): number => parseInt(value, radix);
export const trimAndFilter = (collection: string[]): string[] => collection.map(element => element.trim()).filter(element => element);

export const sortNumberAsc = (a: number, b: number) => a - b;