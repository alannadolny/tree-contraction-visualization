export class Node {
  constructor({ value, left, right, parent }) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }

  isLeftChild() {
    return this.parent?.left === this;
  }

  isLeaf() {
    return !this.left && !this.right;
  }

  toJson() {
    if (this.left && !this.right) {
      return {
        name: this.value,
        children: [this.left.toJson()],
      };
    }

    if (this.right && !this.left) {
      return {
        name: this.value,
        children: [this.right.toJson()],
      };
    }

    if (this.right && this.left) {
      return {
        name: this.value,
        children: [this.left.toJson(), this.right.toJson()],
      };
    }

    return {
      name: this.value,
      children: [],
    };
  }
}
