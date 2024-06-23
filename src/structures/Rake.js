import { LEFT, RIGHT } from '../utils/consts';

export class Rake {
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
      parent.parent[parent.isLeftChild() ? LEFT : RIGHT] = sibling;
      this.tree.removeNode(parent);
      this.tree.removeNode(node);
    });
  }
}
