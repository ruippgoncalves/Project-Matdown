import MathLeafNode from './base/mathLeafNode.mjs';

export default class MathCharacterNode extends MathLeafNode {
  constructor(character) {
    super();
    this.character = character;
  }
}
