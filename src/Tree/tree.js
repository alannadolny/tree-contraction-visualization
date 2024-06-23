class Node {
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

class Tree {
  constructor(tree = []) {
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

  toJson() {
    return this.getRoot().toJson();
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
    return this.tree.map((node) => node.value).join(':');
  }
}

class Rake {
  constructor(tree) {
    this.tree = tree;
  }

  getLeavesToRemove() {
    const leaves = this.tree.tree.filter((node) => !node.left && !node.right);
    const parent = this.tree.getRoot();
    const maxLeftLeaf = this.tree.getMaxLeftLeaf(parent);
    const maxRightLeaf = this.tree.getMaxRightLeaf(parent);
    return leaves.filter(
      (node) => node !== maxLeftLeaf && node !== maxRightLeaf
    );
  }

  getRakeInfo() {
    const leavesToRake = this.getLeavesToRemove();
    const { odd, even } = leavesToRake.reduce(
      (acc, curr, index) => {
        if (index % 2) {
          return { ...acc, even: [...acc.even, curr] };
        }
        return { ...acc, odd: [...acc.odd, curr] };
      },
      { odd: [], even: [] }
    );

    const { left, right } = odd.reduce(
      (acc, curr) => {
        if (curr.isLeftChild()) {
          return { ...acc, left: [...acc.left, curr] };
        }
        return { ...acc, right: [...acc.right, curr] };
      },
      { left: [], right: [] }
    );

    return {
      even,
      odd,
      leavesToRake,
      left,
      right,
    };
  }

  isRakeFinished() {
    return this.tree.tree.length <= 3;
  }

  rake() {
    const { left, right } = this.getRakeInfo();
    [...left, ...right].forEach((node) => {
      const parent = node.parent;
      const sibling = node.isLeftChild() ? node.parent.right : node.parent.left;
      sibling.parent = node.parent.parent;
      parent.parent[parent.isLeftChild() ? 'left' : 'right'] = sibling;
      this.tree.removeNode(parent);
      this.tree.removeNode(node);
    });
  }
}

export const createTree = (nodes) => {
  const nodesArray = nodes.map((value) => (value ? new Node({ value }) : null));
  nodesArray.forEach((node, index) => {
    if (!index) {
      return;
    }

    if (node) {
      const parent = nodesArray[Math.floor((index - 1) / 2)];
      node.parent = parent;
      parent[parent.left ? 'right' : 'left'] = node;
    }
  });

  const treeNodes = nodesArray.filter((node) => node);
  return new Tree(treeNodes);
};

export const getTree = () => {
  const tree = createTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  return { tree, rake: new Rake(tree) };
};
