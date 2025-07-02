import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathImplicitMultiplicationNode extends MathBranchNode {
  constructor(left, right) {
    super(false);
    this.left = left;
    this.right = right;
  }

  *getChildren() {
    yield this.left;
    yield this.right;
  }
}
