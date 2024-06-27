import React, { useEffect, useState } from 'react';
import { Tree as TreeGraph } from 'react-d3-tree';
import { VERTICAL } from '../utils/consts';
import TreeNode from './TreeNode';

export default function Tree({ rake, tree, iteration }) {
  const [dataKey, setDataKey] = useState(null);
  const rakeInfo = rake?.getRakeInfo();

  useEffect(() => {
    setDataKey(tree.generateTreeKey());
  }, [iteration]);

  const getNode = (data) => <TreeNode {...data} />;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TreeGraph
        data={tree.toJson(rakeInfo?.left, rakeInfo?.right)}
        orientation={VERTICAL}
        dataKey={dataKey}
        zoom={0.8}
        translate={{ x: 1100, y: 300 }}
        renderCustomNodeElement={(rd3tProps) => getNode({ ...rd3tProps })}
      />
    </div>
  );
}
