import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathExponentNode extends MathBranchNode {
  constructor(base, exponent) {
    super(!base instanceof MathNumberNode);
    this.base = base;
    this.exponent = exponent;
  }

  *getChildren() {
    yield this.base;
    yield this.exponent;
  }
}
