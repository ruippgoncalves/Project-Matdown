import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathFunctionNode extends MathBranchNode {
  constructor(name, args) {
    super(false);
    this.name = name;
    this.args = args;
  }

  *getChildren() {
    yield this.name;
    for (let arg of this.args)
      yield arg;
  }
}
