import { TREE_KEY_SEPARATOR } from '../utils/consts';

export class Tree {
  constructor(tree) {
    this.tree = tree;
  }

  addNode(node) {
    this.tree = [...this.tree, node];
  }

  removeNode(nodeToRemove) {
    this.tree = this.tree.filter((node) => node !== nodeToRemove);
    this.tree = this.tree.map((node) => {
      if (node.left === nodeToRemove) {
        node.left = null;
      }
      if (node.right === nodeToRemove) {
        node.right = null;
      }
      if (node.parent === nodeToRemove) {
        node.parent = null;
      }
      return node;
    });
  }

  preorderTraversal(node, result) {
    if (!node) {
      return;
    }
    result.push(node);
    this.preorderTraversal(node.left, result);
    this.preorderTraversal(node.right, result);
  }

  getPreorder() {
    const result = [];
    this.preorderTraversal(this.getRoot(), result);
    return result;
  }

  toJson(firstConcurrentRakes, secondConcurrentRakes) {
    return this.getRoot().toJson(firstConcurrentRakes, secondConcurrentRakes);
  }

  getRoot() {
    return this.tree.find((node) => !node.parent);
  }

  getMaxLeftLeaf(node) {
    if (node.isLeaf()) {
      return node;
    }

    if (node.left) {
      return this.getMaxLeftLeaf(node.left);
    }

    return this.getMaxLeftLeaf(node.right);
  }

  getMaxRightLeaf(node) {
    if (node.isLeaf()) {
      return node;
    }

    if (node.right) {
      return this.getMaxRightLeaf(node.right);
    }

    return this.getMaxRightLeaf(node.left);
  }

  generateTreeKey() {
    return this.tree.map((node) => node.value).join(TREE_KEY_SEPARATOR);
  }
}
