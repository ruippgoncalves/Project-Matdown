import MathTreeNode from "./mathTreeNode.mjs";

export default class MathBranchNode extends MathTreeNode {
  constructor(requiresParenthesis) {
    super();

    if (this.constructor == MathBranchNode) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.requiresParenthesis = requiresParenthesis;
  }
}
