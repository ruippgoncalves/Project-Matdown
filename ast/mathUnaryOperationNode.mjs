import MathBranchNode from "./base/mathBranchNode.mjs";
import MathOperationNode from "./mathOperationNode.mjs";
import MathPlaceholderNode from './mathPlaceholderNode.mjs'

export default class MathUnaryOperationNode extends MathBranchNode {
  constructor(operator) {
    const expression = new MathPlaceholderNode();
    super([expression]);
    this.operator = operator;
    this.expression = expression;
  }

  updateRequiresParenthesis() {
    return false;
  }

  *getChildren() {
    yield this.expression;
  }
}
