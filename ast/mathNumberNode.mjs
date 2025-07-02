import MathBranchNode from './base/mathBranchNode.mjs';

export default class MathNumberNode extends MathBranchNode {
  constructor(digits) {
    super([]);
    this.digits = digits;
  }

  updateRequiresParenthesis() {
    return false;
  }

  *getChildren() {
    for (let digit of this.digits)
      yield digit;
  }
}
