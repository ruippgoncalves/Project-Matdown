import MathBranchNode from "./base/mathBranchNode.mjs";

export default class MathNameNode extends MathBranchNode {
  constructor(name) {
    super(false);
    this.name = name;
  }

  *getChildren() {
    for (let character of this.name)
      yield character;
  }
}
