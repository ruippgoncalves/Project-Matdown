import { MathVisitor, MathBranchNode } from '../ast/index.mjs';

export default class MathHtmlEmmiter extends MathVisitor {
  constructor(keyboard) {
    super();
    this.keyboard = keyboard;
  }

  visit(node) {
    let result = super.visit(node);

    if (node instanceof MathBranchNode && node.requiresParenthesis()) {
      result = `<span>(${result})</span>`;
    }

    return result;
  }

  visitDigit(node) {
    return `<span>${node.digit}</span>`;
  }

  visitDecimalSeperator(node) {
    return `<span>${'.'}</span>`;
  }

  visitNumber(node) {
    return `<span>${[...this.visitChildren(node)].join('')}</span>`;
  }

  visitCharacter(node) {
    return `<span>${node.character}</span>`;;
  }

  visitName(node) {
    return `<span>${[...this.visitChildren(node)].join('')}</span>`;
  }

  visitImplicitMultiplication(node) {
    return `<span>${[...this.visitChildren(node)].join('')}</span>`;
  }

  visitFunction(node) {
    return `
      <span class="matdowninline-expression">
        ${this.visit(node.name)}
        <span>(${node.args.map(a => this.visit(a)).join(",")})</span>
      </span>
    `;
  }

  visitExponent(node) {
    return `
      <span class="matdowninline-expression">
        ${this.visit(node.base)}
        <span class="matdownexponent">${this.visit(node.exponent)}</span>
      </span>
    `;
  }

  visitOperation(node) {
    return `
      <span class="matdowninline-expression">
        ${this.visit(node.left)}
        <span class="matdownoperator">${node.operator}</span>
        ${this.visit(node.right)}
      </span>
    `;
  }

  visitUnaryOperation(node) {
    return `
      <span class="matdowninline-expression">
        <span class="matdownoperator">${node.operator}</span>
        ${this.visit(node.expression)}
      </span>
    `;
  }

  visitFraction(node) {
    return `
      <div class="matdownfraction">
        <div class="matdownnumerator">${this.visit(node.numerator)}</div>
        <div class="matdowndenominator">${this.visit(node.denominator)}</div>
      </div>
    `;
  }

  visitPlaceholder(node) {
    let placeholder = node.node !== null
      ? this.visit(node.node)
      : `<span class="matdowngroup"></span>`;

    if (this.keyboard.current === node || this.keyboard.current === node.node) {
      placeholder = `<span class="matdownselected">${placeholder}</span>`;
    }

    return placeholder;
  }
}
