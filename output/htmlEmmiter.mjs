import { MathVisitor, MathBranchNode } from '../ast/index.mjs';

export default class MathHtmlEmmiter extends MathVisitor {
  constructor(keyboard) {
    super();
    this.keyboard = keyboard;
    this.onClick = null;
  }

  visit(node) {
    let result = super.visit(node);

    if (node instanceof MathBranchNode && node.requiresParenthesis()) {
      result = this.createElement('span', 'matdowninline-expression', '(', result, ')');
    }

    return result;
  }

  visitDigit(node) {
    return this.createElement('span', 'matdowninline-expression', node.digit);
  }

  visitDecimalSeperator(node) {
    return this.createElement('span', 'matdowninline-expression', '.');
  }

  visitNumber(node) {
    const content = [...this.visitChildren(node)];
    const n = this.createElement('span', 'matdowninline-expression');
    content.forEach(child => n.append(child));
    return n;
  }

  visitSymbol(node) {
    return this.createElement('span', 'matdowninline-expression', node.symbol);
  }

  visitImplicitMultiplication(node) {
    const content = [...this.visitChildren(node)];
    const n = this.createElement('span', 'matdowninline-expression');
    content.forEach(child => n.append(child));
    return n;
  }

  visitFunction(node) {
    const content = [...this.visitChildren(node)];
    const n = this.createElement('span', 'matdowninline-expression', node.name, '(');
    content.forEach(child => n.append(child));
    n.append(')');
    return n;
  }

  visitExponent(node) {
    return this.createElement('span', 'matdowninline-expression', 
      this.visit(node.base), 
      this.createElement('span', 'matdownexponent', this.visit(node.exponent))
    );
  }

  visitOperation(node) {
    return this.createElement('span', 'matdowninline-expression',
      this.visit(node.left), 
      this.createElement('span', 'matdownoperator', node.operator),
      this.visit(node.right)
    );
  }

  visitUnaryOperation(node) {
    return this.createElement('span', 'matdowninline-expression',
      this.createElement('span', 'matdownoperator', node.operator),
      this.visit(node.expression)
    );
  }

  visitFraction(node) {
    return this.createElement('div', 'matdownfraction',
      this.createElement('div', 'matdownnumerator', this.visit(node.numerator)),
      this.createElement('div', 'matdowndenominator', this.visit(node.denominator))
    );
  }

  visitPlaceholder(node) {
    const placeholder = node.node !== null
      ? this.visit(node.node)
      : this.createElement('span', 'matdowngroup');

    if (this.keyboard.current === node || this.keyboard.current === node.node) {
      placeholder.classList.add('matdownselected');
    }

    if (this.onClick !== null)
      placeholder.addEventListener('click', (event) => {
        event.stopPropagation();
        this.keyboard.current = node.node ?? node;
        this.onClick();
      });

    return placeholder;
  }

  createElement(tag, className, ...children) {
    const element = document.createElement(tag);
    element.classList.add(className);

    children.forEach(child => element.append(child));

    return element;
  }
}
