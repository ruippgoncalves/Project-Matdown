import MathLeafNode from './base/mathLeafNode.mjs';

export default class MathNameNode extends MathLeafNode {
  constructor(character) {
    super();
    this.characters = [character];
  }

  *getChildren() {
    for (let character of this.characters)
      yield character;
  }
}
