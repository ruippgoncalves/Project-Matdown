import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathNameNode extends MathBranchNode {
  constructor(name) {
    super([]);
    this.name = name;
  }

  updateRequiresParenthesis() {
    return false;
  }

  *getChildren() {
    for (let character of this.name)
      yield character;
  }
}
