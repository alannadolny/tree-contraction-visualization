import React, { useEffect, useState } from 'react';
import { Tree as TreeGraph } from 'react-d3-tree';
import { VERTICAL } from '../utils/consts';

export default function Tree({ tree, iteration }) {
  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    setDataKey(tree.generateTreeKey());
  }, [iteration]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TreeGraph
        data={tree.toJson()}
        orientation={VERTICAL}
        dataKey={dataKey}
        zoom={0.8}
        translate={{ x: 1100, y: 300 }}
      />
    </div>
  );
}
