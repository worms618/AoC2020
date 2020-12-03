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

export const calcHitOfTree = (startPoint: Point2D, slope: Point2D, treeMap: TreeMap): number => {
  const heightTreeMap = treeMap.length;
  const widthTreeMap = treeMap[0].length;
  const nextPos = startPoint.copy()
  let treesHit = 0;
  
  while (true) {
    if (nextPos.y > heightTreeMap) break;

    if (nextPos.x > widthTreeMap) {
      treesHit += calcHitOfTree(
        new Point2D((nextPos.x - widthTreeMap), nextPos.y),
        slope,
        treeMap
      );
      break;
    }
    else {
      const charAtNextPos = treeMap[nextPos.y - 1][nextPos.x - 1];
      charAtNextPos === TreeChar ? treesHit++ : {};
    }

    nextPos.add(slope);
  }

  return treesHit;
};