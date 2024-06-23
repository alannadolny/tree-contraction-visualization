import { Tree } from '../structures/Tree';
import { Rake } from '../structures/Rake';
import { Node } from '../structures/Node';
import { LEFT, RIGHT } from './consts';

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

export const getTree = () => {
  const tree = createTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  return { tree, rake: new Rake(tree) };
};
