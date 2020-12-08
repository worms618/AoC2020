import { DayScriptExecutor } from "../../src/day/day.types.ts";

export const executor: DayScriptExecutor = (input: string): string => {
  const bagCache = new BagCache();
  parseInputToLines(input).map(line => getAndSetBags(bagCache, line));
  const shinyGold: Bag = bagCache.getBag('shiny', 'gold');
  const totalBags = getTotalBags(bagCache, shinyGold);
      
  return `Total amount of bags: ${totalBags} for 1 shiny gold`;
};

export const parseInputToLines = (input: string): string[] => {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);
};

function getBagIdentifier(shade: string, color: string): string {
  return `${shade}|${color}`;
}

class Bag {
  public content: Map<string, number>;
  constructor(public identifier: string) {
    this.content = new Map<string, number>();
  }

  addContent(bag: string, amount: number): void {
    if (!this.content.has(bag)) {
      this.content.set(bag, amount);
    }
  }

  getTotalAmountOfBags(): number {
    let total = 0;
    for (const amount of this.content.values()) {
      total += amount;
    }
    return total;
  }
}

class BagCache {
  private bags: Map<string, Bag>;
  constructor() {
    this.bags = new Map<string, Bag>();
  }

  createBag(shade: string, color: string): string {
    return getBagIdentifier(shade, color);
  }

  getBag(shade: string, color: string): Bag {
    const key: string = getBagIdentifier(shade, color);
    const bag = this.bags.get(key);

    if (bag) return bag;
    throw new Error(`No bag found for shade: ${shade} and color: ${color}`);
  }

  addBag(shade: string, color: string): Bag {
    const bagIdentifier = getBagIdentifier(shade, color);

    if (!this.bags.has(bagIdentifier)) {
      const newBag = new Bag(bagIdentifier);
      this.bags.set(newBag.identifier, newBag);
    }

    const bag = this.bags.get(bagIdentifier);
    if (bag) return bag;
    throw new Error(`Something went wrong while adding the bag for shade: ${shade} and color: ${color}`);
  }

  hasBag(shade: string, color: string): boolean {
    return this.bags.has(getBagIdentifier(shade, color));
  }
}

export const getAndSetBags = (bagCache: BagCache, line: string): void => {
  const bagAndContent = line.split('contain').map(part => part.trim()).filter(part => part);

  if (bagAndContent.length > 0) {
    const parentBag: Bag = getAndSetBag(bagCache, bagAndContent[0]);
    getAndSetBagContents(bagCache, bagAndContent[1])
      .forEach(bagContent => {
        if (bagContent === undefined) return;
        const { bag, amount } = bagContent;

        parentBag.addContent(bag.identifier, amount);
      });
  } else {
    throw new Error(`Argument line did not have the word 'contain': [${line}]`);
  }
};

export const getAndSetBag = (bagCache: BagCache, bagShadeAndColor: string): Bag => {
  const details = bagShadeAndColor.split(' ').map(part => part.trim()).filter(part => part);

  if (details.length > 1) {
    const shade = details[0];
    const color = details[1];

    if (bagCache.hasBag(shade, color)) {
      return bagCache.getBag(shade, color);
    } else {
      return bagCache.addBag(shade, color);
    }
  } else {
    throw new Error(`Bag details is not enough for: ${bagShadeAndColor}`);
  }
}

export const getAndSetBagContents = (bagCache: BagCache, bagContents: string): ({ bag: Bag, amount: number } | undefined)[] => {
  const bagContentsCollection = bagContents.split(',').map(part => part.trim()).filter(part => part);
  return bagContentsCollection
    .map(bagContent => getAndSetBagContent(bagCache, bagContent))
    .filter(bagContent => bagContent !== undefined);
}

const getBagContentDetailsRegExp: RegExp = /(\d+)\s+(\w+)\s*(\w*)\s*bags?/;
export const getAndSetBagContent = (bagCache: BagCache, bagContent: string): { bag: Bag, amount: number } | undefined => {
  const regRes = getBagContentDetailsRegExp.exec(bagContent);

  if (regRes && (regRes.length > 3)) {
    const amount = regRes[1].trim();
    const shade = regRes[2].trim();
    const color = regRes[3].trim();

    let bag: Bag | undefined = undefined;

    if (bagCache.hasBag(shade, color)) {
      bag = bagCache.getBag(shade, color);
    } else {
      bag = bagCache.addBag(shade, color);
    }

    if (bag) {
      return {
        bag: bag,
        amount: parseInt(amount, 10)
      }
    } else {
      throw new Error(`No bag found for shade: [${shade}] and color: [${color}]; bagContent: [${bagContent}]`)
    }
  }
  return undefined;
}

const getTotalBags = (bagCache: BagCache, bag: Bag): number => {
  let total = bag.getTotalAmountOfBags();
  for (const bagContent of bag.content.entries()) {
    const amount = bagContent[1];
    const bagContentIdentifierDetails = bagContent[0].split('|');
    const contentBag = bagCache.getBag(bagContentIdentifierDetails[0], bagContentIdentifierDetails[1]);

    total += (amount * getTotalBags(bagCache, contentBag));
  }
  return total;
};