import { PINK_500_HEX, PURPLE_500_HEX, TEAL } from '../utils/consts';

export class Node {
  constructor({ value, left, right, parent }) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.color = TEAL;
  }

  isLeftChild() {
    return this.parent?.left === this;
  }

  isLeaf() {
    return !this.left && !this.right;
  }

  getNodeColouring(firstConcurrentRakes = [], secondConcurrentRakes = []) {
    if (firstConcurrentRakes.includes(this)) {
      return PINK_500_HEX;
    }

    if (secondConcurrentRakes.includes(this)) {
      return PURPLE_500_HEX;
    }

    return TEAL;
  }

  toJson(firstConcurrentRakes, secondConcurrentRakes) {
    const props = {
      color: this.getNodeColouring(firstConcurrentRakes, secondConcurrentRakes),
      name: this.value,
    };

    if (this.left && !this.right) {
      return {
        ...props,
        children: [
          this.left.toJson(firstConcurrentRakes, secondConcurrentRakes),
        ],
      };
    }

    if (this.right && !this.left) {
      return {
        ...props,
        children: [
          this.right.toJson(firstConcurrentRakes, secondConcurrentRakes),
        ],
      };
    }

    if (this.right && this.left) {
      return {
        ...props,
        children: [
          this.left.toJson(firstConcurrentRakes, secondConcurrentRakes),
          this.right.toJson(firstConcurrentRakes, secondConcurrentRakes),
        ],
      };
    }

    return {
      ...props,
      children: [],
    };
  }
}
