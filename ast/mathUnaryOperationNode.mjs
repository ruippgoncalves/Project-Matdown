import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathUnaryOperationNode extends MathBranchNode {
 constructor(operator, expression) {
    super(!base instanceof MathNumberNode);
    this.operator = operator;
    this.expression = expression;
  }

  *getChildren() {
    yield this.expression;
  }
}
