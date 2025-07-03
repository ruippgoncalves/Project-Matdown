import { MathPlaceholderNode, MathDigitNode, MathNumberNode, MathLeafNode, MathBranchNode, MathNameNode, MathDecimalSeperatorNode, MathImplicitMultiplicationNode } from "../ast/index.mjs";

export default class MathKeyboard {
  constructor() {
    this.root = new MathPlaceholderNode();
    this.current = this.root;

    this.selectionLeft = null;
    this.selectionRight = null;
  }

  moveRight() {
    if (!(this.current instanceof MathPlaceholderNode)) this.current = this.current.parentPlaceholder;

    while (true) {
      if (this.current.parentNode == null) {
        this.current = this.current.node ?? this.current;
        return;
      }

      let temp = afterOr(this.current.parentNode.placeholders, this.current);

      if (temp != null) {
        this.current = temp;

        if (this.current.node !== null) {
          this.current = this.current.node;

          while (this.current instanceof MathBranchNode) {
            this.current = this.current.placeholders[0];
          }
        }

        break;
      } else {
        this.current = this.current.parentNode.parentPlaceholder;
      }
    }
  }

  moveLeft() {
    let start = this.current;

    if (!(this.current instanceof MathPlaceholderNode)) this.current = this.current.parentPlaceholder;

    if (this.current.parentNode == null) {
      while (this.current.node instanceof MathBranchNode) {
        this.current = this.current.node.placeholders[this.current.node.placeholders.length - 1];
      }
      return;
    }

    while (true) {
      if (this.current.parentNode == null) {
        this.current = start;
        return;
      }

      let temp = beforeOr(this.current.parentNode.placeholders, this.current);

      if (temp != null) {
        this.current = temp;

        if (this.current.node !== null) {
          this.current = this.current.node;

          while (this.current instanceof MathBranchNode) {
            this.current = this.current.placeholders[this.current.placeholders.length - 1];
          }
        }

        break;
      } else {
        this.current = this.current.parentNode.parentPlaceholder;
      }
    }
  }

  insert(node) {
    if (node instanceof MathBranchNode && !(this.current instanceof MathPlaceholderNode)) {
      let cur = this.current;
      this.current = this.current.parentPlaceholder;
      this.insert(node);
      this.insert(cur);
      this.current = node.placeholders[0];
      this.moveRight();
      return;
    }

    if (!(this.current instanceof MathPlaceholderNode)) this.current = this.current.parentPlaceholder;

    node.parentPlaceholder = this.current;
    this.current.node = node;
    this.current = node instanceof MathBranchNode ? node.placeholders[0] : node;
  }

  insertDigit(digit) {
    if (this.current instanceof MathNumberNode) {
      this.current.digits.push(digit);
    } else {
      this.insert(new MathNumberNode(digit));
    }
  }

  insertDecimalSeperator() {
    if (!(this.current instanceof MathNumberNode)) {
      const digit = new MathDigitNode(0);
      this.insert(new MathNumberNode(digit));
    }

    for (let digit of this.current.digits) {
      if (digit instanceof MathDecimalSeperatorNode) {
        this.current = this.current.parentPlaceholder;
        this.insertDecimalSeperator();
        return;
      }
    }

    this.current.digits.push(new MathDecimalSeperatorNode());
  }

  insertCharacter(char) {
    if (this.current instanceof MathNameNode) {
      this.current.characters.push(char);
    } else if (this.current instanceof MathImplicitMultiplicationNode) {
      console.assert(this.current.right instanceof MathNameNode);
      this.current.right.characters.push(char);
    } else if (this.current instanceof MathNumberNode) {
      let cur = this.current;
      this.insert(new MathImplicitMultiplicationNode());
      cur.parentPlaceholder = null;
      this.current.left = cur;
      this.current.right = new MathNameNode(char);
    } else {
      this.insert(new MathNameNode(char));
    }
  }

  delete() {
    if (this.current instanceof MathPlaceholderNode) {
      if (this.current.parentNode !== null)
        this.current = this.current.parentNode;
      else
        return;
    }

    if (this.current instanceof MathNumberNode) {
      this.current.digits.pop();
      if (this.current.digits.length != 0) return;
    } else if (this.current instanceof MathNameNode) {
      this.current.characters.pop();
      if (this.current.characters.length != 0) return;
    } else if (this.current instanceof MathImplicitMultiplicationNode) {
      this.current.right.characters.pop();
      if (this.current.right.characters.length != 0) return;
      const number = this.current.left;
      this.insert(number);
      return;
    }

    this.current = this.current.parentPlaceholder;
    this.current.node = null;
  }
}

function afterOr(array, element) {
  const index = array.indexOf(element);

  return (index == -1 || index == array.length - 1)
    ? null
    : array[index + 1];
}

function beforeOr(array, element) {
  const index = array.indexOf(element);

  return (index == -1 || index == 0)
    ? null
    : array[index - 1];
}
