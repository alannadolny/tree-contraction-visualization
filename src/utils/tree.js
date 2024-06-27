import { Tree } from '../structures/Tree';
import { Rake } from '../structures/Rake';
import { Node } from '../structures/Node';
import { DEFAULT_TREE, LEFT, RIGHT } from './consts';

export const createTree = (nodes) => {
  const nodesArray = nodes.map((value) => (value ? new Node({ value }) : null));
  nodesArray.forEach((node, index) => {
    if (!index) {
      return;
    }

    if (node) {
      const parent = nodesArray[Math.floor((index - 1) / 2)];
      node.parent = parent;
      parent[parent.left ? RIGHT : LEFT] = node;
    }
  });

  const treeNodes = nodesArray.filter((node) => node);
  return new Tree(treeNodes);
};

export const getTree = (nodes) => {
  const tree = createTree(nodes ?? DEFAULT_TREE);
  return { tree, rake: new Rake(tree) };
};
