import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathFunctionNode extends MathBranchNode {
  constructor(name, argCount) {
    const args = new Array(argCount).fill(null).map(() => new Placeholder());
    super(args);
    this.name = name; // TODO to string
    this.args = args;
  }

  updateRequiresParenthesis() {
    return false;
  }

  *getChildren() {
    yield this.name;
    for (let arg of this.args)
      yield arg;
  }
}
