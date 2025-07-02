import { getUnaryOperatorPrecedence, getBinaryOperatorPrecedence } from './syntaxFacts.mjs';
import { MathDigitNode, MathDecimalSeperatorNode, MathNumberNode, MathCharacterNode, MathNameNode, MathImplicitMultiplicationNode, MathFunctionNode, MathExponentNode, MathOperationNode, MathUnaryOperationNode, MathFractionNode } from '../ast/index.mjs';
import symbols from './symbols.mjs';

export default class MathParser {
  constructor(text) {
    this.text = text.replace(/\s+/g, '');
    this.pos = 0;
    this.currentChar = this.text[this.pos];
  }

  advance() {
    this.pos++;
    this.currentChar = this.pos < this.text.length ? this.text[this.pos] : null;
  }

  peek() {
    return this.pos + 1 < this.text.length ? this.text[this.pos + 1] : null;
  }

  parse() {
    const node = this.expr();
    if (this.currentChar !== null) throw new Error("Unexpected character at end");
    return node;
  }

  eat(char) {
    if (this.currentChar === char) {
      this.advance();
    } else {
      throw new Error(`Expected '${char}', got '${this.currentChar}'`);
    }
  }

  number() {
    const digits = [];
    let hasDecimalSeparator = false;

    while (this.currentChar && /[0-9.]/.test(this.currentChar)) {
      if (this.currentChar === '.') {
        if (hasDecimalSeparator) {
          throw new Error("Multiple decimal separators in number");
        }
        hasDecimalSeparator = true;
        digits.push(new MathDecimalSeperatorNode());
      } else {
        digits.push(new MathDigitNode(parseInt(this.currentChar, 10)));
      }
      this.advance();
    }

    return new MathNumberNode(digits);
  }

  name() {
    const nameParts = [];

    while (this.currentChar && /[a-zA-Z0-9]/.test(this.currentChar)) {
      const char = this.currentChar;
      this.advance();

      if (/[a-zA-Z]/.test(char)) {
        nameParts.push(new MathCharacterNode(char));
      } else {
        nameParts.push(new MathDigitNode(parseInt(char, 10)));
      }
    }

    return new MathNameNode(nameParts);
  }

  primary() {
    if (this.currentChar === '(') {
      this.advance();
      const node = this.expr();
      this.eat(')');
      return node;
    }

    if (/[0-9.]/.test(this.currentChar)) {
      let value = this.number();

      if (/[a-zA-Z]/.test(this.currentChar)) {
        const expression = this.binary(getBinaryOperatorPrecedence(symbols.times));
        value = new MathImplicitMultiplicationNode(value, expression);
      }

      return value;
    }

    if (/[a-zA-Z]/.test(this.currentChar)) {
      const nameNode = this.name();

      if (this.currentChar === '(') {
        this.advance();
        const args = [];

        if (this.currentChar === ')') {
          this.advance();
          return new MathFunctionNode(nameNode, args);
        }

        while (true) {
          const arg = this.expr();
          args.push(arg);

          if (this.currentChar === ',') {
            this.advance();
          } else if (this.currentChar === ')') {
            this.advance();
            break;
          } else {
            throw new Error("Expected ',' or ')' in function arguments");
          }
        }

        return new MathFunctionNode(nameNode, args);
      }

      return nameNode;
    }

    throw new Error("Invalid character in factor");
  }

  binary(parentPrecedence) {
    let left;

    const unaryOperatorPrecedence = getUnaryOperatorPrecedence(this.currentChar);
    if (unaryOperatorPrecedence != 0 && unaryOperatorPrecedence >= parentPrecedence) {
      const operator = this.currentChar;
      this.advance();
      const operand = this.binary(unaryOperatorPrecedence);
      left = new MathUnaryOperationNode(operator, operand);
    } else {
      left = this.primary();
    }

    while (true) {
      const precedence = getBinaryOperatorPrecedence(this.currentChar);
      if (precedence == 0 || precedence <= parentPrecedence)
        break;

      const operator = this.currentChar;
      this.advance();
      const right = this.binary(precedence);

      switch (operator) {
        case '^':
          left = new MathExponentNode(left, right);
          break;
        case '/':
          left = new MathFractionNode(left, right);
          break;
        default:
          left = new MathOperationNode(left, operator, right);
      }
    }

    return left;
  }

  expr() {
    return this.binary(0);
  }
}
