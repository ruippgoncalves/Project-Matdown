import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathImplicitMultiplicationNode extends MathBranchNode {
  constructor(left, right) {
    super([]);
    this.left = left;
    this.right = right;
  }

  updateRequiresParenthesis() {
    return false;
  }

  *getChildren() {
    yield this.left;
    yield this.right;
  }
}
