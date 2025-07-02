import MathBranchNode from './base/mathBranchNode.mjs';

export default class MathNumberNode extends MathBranchNode {
  constructor(digits) {
    super(false);
    this.digits = digits;
  }

  *getChildren() {
    for (let digit of this.digits)
      yield digit;
  }
}
