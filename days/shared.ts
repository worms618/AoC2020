export const getInputLinesTrimAndFilterEmpty = (input: string): string[] => {
  return input.split('\n').map(line => line.trim()).filter(line => line);
}