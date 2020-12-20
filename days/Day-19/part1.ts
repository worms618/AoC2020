import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { mapToInteger } from "../shared.ts";

interface IRule {
  nr: number;
  applies(value: string): boolean;
  requestedChars(): number;
};

interface IRuleWithOthers extends IRule {
  setOthers(allRules: Map<number, IRule>): void;
}

class CharRule implements IRule {
  constructor(public nr: number, private char: string) {

  }

  applies(value: string): boolean {
    return value === this.char;
  }

  requestedChars(): number {
    return 1;
  }
}

class RuleByOthers implements IRuleWithOthers {
  private otherRules: IRule[];

  constructor(public nr: number, public otherRuleNrs: number[]) {
    this.otherRules = [];
  }

  setOthers(allRules: Map<number, IRule>) {
    this.otherRules = [];

    for (const otherRuleNr of this.otherRuleNrs) {
      const otherRule = allRules.get(otherRuleNr);

      if (otherRule) this.otherRules.push(otherRule);
      else throw new Error(`No rule found for number: ${otherRuleNr}`);
    }
  }

  applies(value: string): boolean {
    
    let startSubString = 1;

    for (const otherRule of this.otherRules) {
      const valuePart = value.substr(startSubString - 1, otherRule.requestedChars());
      
      const applies = otherRule.applies(valuePart);
      startSubString += otherRule.requestedChars();

      if (!applies) return false;
    }

    // Matched all chars
    return startSubString - 1 === value.length;
  }

  requestedChars(): number {
    return this.otherRules.reduce((totalChars, rule) => totalChars += rule.requestedChars(), 0);
  }
}

class RuleOrRuleByOthers implements IRuleWithOthers {
  private otherRules: IRule[];

  constructor(public nr: number, public orOtherRuleNrs: number[][]) {
    this.otherRules = [];
  }

  setOthers(allRules: Map<number, IRule>) {
    this.otherRules = this.orOtherRuleNrs.map(otherRuleNrs => {
      const ruleByOthers = new RuleByOthers(-1, otherRuleNrs);
      ruleByOthers.setOthers(allRules);
      return ruleByOthers;
    });
  }

  applies(value: string): boolean {
    for (const otherRule of this.otherRules) {
      const applies = otherRule.applies(value);
      if (applies) return true;
    }

    return false;
  }

  requestedChars(): number {
    return this.otherRules[0].requestedChars();
  }
}

export const executor: DayScriptExecutor = (input: string): string => {
  const lines = input.split('\n').map(line => line.trim());

  const { ruleLines, messages } = getLinesForRulesAndMessage(lines);

  const rules = getRules(ruleLines);

  const ruleZero = rules.get(0);

  let totalMatchRules = 0;

  if (ruleZero) {
    totalMatchRules = messages.filter(message => ruleZero.applies(message)).length;
  }

  return `The number of messages that completely match rule 0: ${totalMatchRules}`;
};

const getLinesForRulesAndMessage = (lines: string[]): { ruleLines: string[], messages: string[] } => {
  let pushToMessages = false;

  return lines.reduce<{ ruleLines: string[], messages: string[] }>((lineObj, line) => {
    if (line.trim() === '') pushToMessages = true;
    else pushToMessages ? lineObj.messages.push(line) : lineObj.ruleLines.push(line);

    return lineObj;
  }, {
    ruleLines: [],
    messages: []
  });
}

const getRules = (lines: string[]): Map<number, IRule> => {
  const rules = new Map<number, IRule>();

  const getRuleNrAndContentRegExp = /(\d+):(.*)/;
  for (const line of lines) {
    const regRes = getRuleNrAndContentRegExp.exec(line);

    if (regRes && (regRes.length > 2)) {
      const nr = parseInt(regRes[1].trim(), 10);
      const content = regRes[2].trim();

      const rule = createRule(nr, content);

      rules.set(nr, rule)
    } else {
      throw new Error(`Did not found rule for line: ${line}`)
    }
  }

  rules.forEach(rule => {
    if ((rule instanceof RuleByOthers) || (rule instanceof RuleOrRuleByOthers))
      (rule as IRuleWithOthers).setOthers(rules);
  });

  return rules;
}

const createRule = (nr: number, ruleContent: string): IRule => {
  if (ruleContent.startsWith('"'))
    return new CharRule(nr, String(ruleContent.split('"').filter(p => p.trim())));

  else if (ruleContent.indexOf('|') >= 0) {
    const orRuleByOthers = ruleContent.split('|')
      .map(otherRuleNrs =>
        otherRuleNrs
          .split(' ')
          .filter(char => char.trim().length > 0)
          .map(mapToInteger(10))
      );
    return new RuleOrRuleByOthers(nr, orRuleByOthers);
  } else {
    const otherRules = ruleContent.split(' ').map(mapToInteger(10));
    return new RuleByOthers(nr, otherRules);
  }
};