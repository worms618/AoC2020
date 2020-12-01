export class AdditionSumValues {
  protected values: number[];

  constructor() {
    this.values = [];
  }

  sum(): number {
    return this.values.reduce((sum, value) => sum + value);
  }

  multiply(): number {
    return this.values.reduce((sum, value) => sum * value);
  }

  toString(): string {
    return [
      `${this.values.join(' + ')} = ${this.sum()};`,
      `${this.values.join(' * ')} = ${this.multiply()};`
    ].join('\n');
  };
}

export class AdditionSumOneValues extends AdditionSumValues {  
  constructor(value1: number = -1) {
    super();
    this.values.push(value1);
  }

  public get value1(): number {
    return this.values[0];
  }

  public set value1(value: number) {
    this.values[0] = value;
  }
}

export class AdditionSumTwoValues extends AdditionSumOneValues {  
  constructor(value1: number = -1, value2: number = -1) {
    super(value1);
    this.values.push(value2);
  }

  public get value2(): number {
    return this.values[1];
  }

  public set value2(value: number) {
    this.values[1] = value;
  }
}

export class AdditionSumThreeValues extends AdditionSumTwoValues {  
  constructor(value1: number = -1, value2: number = -1, value3: number = -1) {
    super(value1, value2);
    this.values.push(value3);
  }

  public get value3(): number {
    return this.values[2];
  }

  public set value3(value: number) {
    this.values[2] = value;
  }
}