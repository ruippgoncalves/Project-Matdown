import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathOperationNode extends MathBranchNode {
 constructor(left, operator, right) {
    super(false);

    if (left instanceof MathOperationNode && getBinaryOperatorPrecedence(left.operator) < getBinaryOperatorPrecedence(operator)) left.requiresParenthesis = true;
    if (right instanceof MathOperationNode && getBinaryOperatorPrecedence(right.operator) < getBinaryOperatorPrecedence(operator)) right.requiresParenthesis = true;
    
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  *getChildren() {
    yield this.left;
    yield this.right;
  }
}
