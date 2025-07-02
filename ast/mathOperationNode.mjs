import MathBranchNode from "./base/mathBranchNode.mjs";
import MathPlaceholderNode from './mathPlaceholderNode.mjs';
import {getBinaryOperatorPrecedence} from '../syntax/syntaxFacts.mjs';

export default class MathOperationNode extends MathBranchNode {
  constructor(operator) {
    const left = new MathPlaceholderNode();
    const right = new MathPlaceholderNode();

    super([left, right]);

    this.left = left;
    this.operator = operator;
    this.right = right;
    this.requiresParen = false;
  }

  updateRequiresParenthesis() {
    if (this.left.node instanceof MathOperationNode && getBinaryOperatorPrecedence(this.left.node.operator) < getBinaryOperatorPrecedence(this.operator)) this.left.node.requiresParen = true;
    if (this.right.node instanceof MathOperationNode && getBinaryOperatorPrecedence(this.right.node.operator) < getBinaryOperatorPrecedence(this.operator)) this.right.node.requiresParen = true;

    return this.requiresParen;
  }

  *getChildren() {
    yield this.left;
    yield this.right;
  }
}
