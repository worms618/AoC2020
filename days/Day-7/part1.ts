import { DayScriptExecutor } from "../../src/day/day.types.ts";

type Bag = {
  shade: string,
  color: string
}

function getHashedIdentifier(shade: string, color: string): string {
  return `${shade}|${color}`;
}

class BagRule {
  public parents: Map<string, BagRule>;
  public childs: Map<string, BagRule>;
  constructor(public rule: Bag) {
    this.parents = new Map<string, BagRule>();
    this.childs = new Map<string, BagRule>();
  }

  addChild(bag: BagRule): void {
    if (!this.hasKey(this.childs, bag)) {
      this.childs.set(getHashedIdentifier(bag.rule.shade, bag.rule.color), bag);
    }
  }

  addParent(bag: BagRule): void {
    if (!this.hasKey(this.parents, bag)) {
      this.parents.set(getHashedIdentifier(bag.rule.shade, bag.rule.color), bag);
    }
  }

  private hasKey(map: Map<string, BagRule>, bag: BagRule): boolean {
    return map.has(getHashedIdentifier(bag.rule.shade, bag.rule.color));
  }
}

class BagRuleCache {
  private bagRules: Map<string, BagRule>;
  constructor() {
    this.bagRules = new Map<string, BagRule>();
  }

  createBag(shade: string, color: string): Bag {
    return {
      shade, color
    }
  }

  getBagRule(shade: string, color: string): BagRule {
    const key: string = getHashedIdentifier(shade, color);
    const ruleNode = this.bagRules.get(key);

    if (ruleNode) return ruleNode;
    throw new Error(`No rule node found for shade: ${shade} and color: ${color}`);
  }

  addBagRule(shade: string, color: string): BagRule {
    const key = getHashedIdentifier(shade, color);

    if (!this.bagRules.has(key)) {
      const newRuleNode = new BagRule({ shade, color });
      this.bagRules.set(key, newRuleNode);
    }

    const bagRule = this.bagRules.get(key);
    if (bagRule) return bagRule;
    throw new Error(`Something went wrong while adding the rule node for shade: ${shade} and color: ${color}`);
  }

  hasBagRule(shade: string, color: string): boolean {
    return this.bagRules.has(getHashedIdentifier(shade, color));
  }
}

export const executor: DayScriptExecutor = (input: string): string => {
  const bagRuleCache = new BagRuleCache();
  parseInputToLines(input).map(line => getAndFillRuleNodes(bagRuleCache, line));

  const shinyGold: BagRule = bagRuleCache.getBagRule('shiny', 'gold');
  const allParentsOfShinyGold: Set<string> = new Set<string>();
  getAllParents(shinyGold, allParentsOfShinyGold);

  return `Total of get all parents: ${allParentsOfShinyGold.size}`;
};

export const parseInputToLines = (input: string): string[] => {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);
};

export const getAndFillRuleNodes = (bagRuleCache: BagRuleCache, line: string): void => {
  const bagAndContent = line.split('contain').map(part => part.trim()).filter(part => part);

  if (bagAndContent.length > 0) {
    const bagRule: BagRule = getAndSetBagRule(bagRuleCache, bagAndContent[0]);
    getAndSetBagContents(bagRuleCache, bagAndContent[1])
      .forEach(bagRuleContent => {
        if (bagRuleContent === undefined) return;

        bagRule.addChild(bagRuleContent);
        bagRuleContent.addParent(bagRule);
      });
  } else {
    throw new Error(`Argument line did not have the word 'contain': [${line}]`);
  }
};

export const getAndSetBagRule = (bagRuleCache: BagRuleCache, bagDetails: string): BagRule => {
  const details = bagDetails.split(' ').map(part => part.trim()).filter(part => part);

  if (details.length > 1) {
    const { shade, color } = bagRuleCache.createBag(details[0], details[1]);

    if (bagRuleCache.hasBagRule(shade, color)) {
      return bagRuleCache.getBagRule(shade, color);
    } else {
      return bagRuleCache.addBagRule(shade, color);
    }
  } else {
    throw new Error(`Bag details is not enough for: ${bagDetails}`);
  }
}

export const getAndSetBagContents = (bagRuleCache: BagRuleCache, bagContents: string): (BagRule | undefined)[] => {
  const bagContentsCollection = bagContents.split(',').map(part => part.trim()).filter(part => part);
  return bagContentsCollection
    .map(bagContent => getAndSetBagContent(bagRuleCache, bagContent))
    .filter(bagContent => bagContent !== undefined);
}

const getBagContentDetailsRegExp: RegExp = /\d+\s+(\w+)\s*(\w*)\s*bags?/;

export const getAndSetBagContent = (bagRuleCache: BagRuleCache, bagContent: string): BagRule | undefined => {
  const regRes = getBagContentDetailsRegExp.exec(bagContent);

  if (regRes && (regRes.length > 2)) {
    const { shade, color } = bagRuleCache.createBag(regRes[1].trim(), regRes[2].trim());
    if (bagRuleCache.hasBagRule(shade, color)) {
      return bagRuleCache.getBagRule(shade, color);
    } else {
      return bagRuleCache.addBagRule(shade, color);
    }
  }
}

const getAllParents = (bagRule: BagRule, allParents: Set<string>) : void => {
  for (const parentRuleKey of bagRule.parents.keys()) {
    const parentRule = bagRule.parents.get(parentRuleKey);
    if (parentRule) {
      allParents.add(parentRuleKey);
      getAllParents(parentRule, allParents);
    }
  }
};