import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from "../shared.ts";

type SumNode = {
  sIndex: number;
  eIndex: number;
  childs: SumNode[];
  sumLine: string;
};

interface ICalculation {
  getValue(): number;
}

class CalculationValue implements ICalculation {
  constructor(public value: number) {
  }

  getValue(): number {
    return this.value;
  }
}

abstract class CalculationOperator implements ICalculation {
  constructor(public left: ICalculation | undefined = undefined, public right: ICalculation | undefined = undefined) {
  }

  getValue(): number {
    if (this.left && this.right)
      return this.operatorAction(this.right, this.left);

    throw new Error('Cannot do operator without both left and right given');
  }

  abstract operatorAction(left: ICalculation, right: ICalculation): number;
};

class CalculationAddition extends CalculationOperator {
  operatorAction(left: ICalculation, right: ICalculation): number {
    return left.getValue() + right.getValue();
  }
}

class CalculationMultiplication extends CalculationOperator {
  operatorAction(left: ICalculation, right: ICalculation): number {
    return left.getValue() * right.getValue();
  }
}

export const executor: DayScriptExecutor = (input: string): string => {
  const lines = getInputLinesTrimAndFilterEmpty(input);
  const nodes: { node: SumNode, calc: ICalculation }[] = lines.map(line => {
    const node = getSumNode(line, 0, line.length - 1);
    const calc = getSumCalculation(node);

    return {
      node, calc
    }
  });

  const sumOfResults = nodes.reduce((sum, node, index) => {
    const value = node.calc.getValue();
    // console.log(`Line${index + 1}:`, value);

    return sum + value;
  }, 0);


  return `Sum of the resulting values: ${sumOfResults}`;
};

const getSumNode = (line: string, startIndex: number, endIndex: number): SumNode => {
  const node: SumNode = {
    sIndex: startIndex,
    eIndex: endIndex,
    childs: [],
    sumLine: ''
  };

  const chars = Array.from(line);

  let currChildStartIndex: number | undefined = undefined;

  const otherNodes: number[] = [];

  for (let i = startIndex; i <= endIndex; i++) {
    const char = chars[i];

    if (char === '(') {
      if (currChildStartIndex === undefined) {
        currChildStartIndex = i;
      } else {
        otherNodes.push(i);
      }

    } else if (char === ')') {
      if (otherNodes.length === 0) {
        if (currChildStartIndex !== undefined) {
          const child = getSumNode(line, currChildStartIndex + 1, i - 1);
          node.childs.push(child);

          node.sumLine += `C${node.childs.length - 1}`;
          i = child.eIndex + 1;
          currChildStartIndex = undefined;
        }
      } else {
        otherNodes.pop();
      }
    } else if (currChildStartIndex === undefined) {
      node.sumLine += char;
    }
  }

  return node;
}

const getSumCalculation = (node: SumNode): ICalculation => {
  const parts = node.sumLine.split(' ');
  let calculationParts: ICalculation[] = [];
  const isNumRegExp = /\d+/;
  const childCalculations = node.childs.map(getSumCalculation);
  const operatorSymbols = ['+', '*'];

  const additionOperatorsPartIndices: number[] = [];

  for (const part of parts) {
    if (part.startsWith('C')) {
      const childCalc = childCalculations[parseInt(part.slice(1))];
      calculationParts.push(childCalc)
    } else if (operatorSymbols.indexOf(part) >= 0) {
      if (part === '+') {
        calculationParts.push(new CalculationAddition());
        additionOperatorsPartIndices.push(calculationParts.length - 1)
      }

      else if (part === '*') {
        calculationParts.push(new CalculationMultiplication());
      }

    } else if (isNumRegExp.test(part)) {
      calculationParts.push(new CalculationValue(parseInt(part)));
    }
  }

  for (let i = 0; i < additionOperatorsPartIndices.length; i++) {
    const addOpIndex = additionOperatorsPartIndices[i] - (i * 2);
    const leftValueIndex = addOpIndex - 1;
    const rightValueIndex = addOpIndex + 1;

    const leftValue = calculationParts[leftValueIndex];
    const rightValue = calculationParts[rightValueIndex];
    const op = calculationParts[addOpIndex];

    (op as CalculationOperator).left = leftValue;
    (op as CalculationOperator).right = rightValue;

    calculationParts.splice(leftValueIndex, 1);
    calculationParts.splice(rightValueIndex - 1, 1);
  }

  while (calculationParts.length > 1) {
    for (let i = 0; i < calculationParts.length; i++) {
      const part = calculationParts[i];

      if (part instanceof CalculationMultiplication) {
        const op = (part as CalculationMultiplication);

        if ((op.left === undefined) && (op.right === undefined)) {

          const leftValueIndex = i - 1;
          const rightValueIndex = i + 1;

          const leftValue = calculationParts[i - 1];
          const rightValue = calculationParts[i + 1];

          op.left = leftValue;
          op.right = rightValue;

          calculationParts.splice(leftValueIndex, 1);
          calculationParts.splice(rightValueIndex - 1, 1);
          break;
        }
      }
    }
  }

  return calculationParts[0];
};