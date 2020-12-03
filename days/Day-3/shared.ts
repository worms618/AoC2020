export type TreeMap = string[][];
export class Point2D {
  constructor(public x: number = 0, public y: number = 0) {
  }

  copy(): Point2D {
    return new Point2D(this.x, this.y);
  }

  add(other: Point2D): void {
    this.x += other.x;
    this.y += other.y;
  }
};

export const TreeChar = '#';
export const getTreeMap = (input: string): TreeMap => {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => line.split('').map(char => char.trim()));
};