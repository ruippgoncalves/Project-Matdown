import MathBranchNode from './base/mathBranchNode.mjs';

export default class MathFractionNode extends MathBranchNode {
 constructor(numerator, denominator) {
    super(false);
    this.numerator = numerator;
    this.denominator = denominator;
  }

  *getChildren() {
    yield this.numerator;
    yield this.denominator;
  }
}
