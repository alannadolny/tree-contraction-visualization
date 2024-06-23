import React, { useEffect, useState } from 'react';
import { Tree as TreeGraph } from 'react-d3-tree';

export default function Tree({ tree, iteration }) {
  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    setDataKey(tree.generateTreeKey());
  }, [iteration]);

  return (
    <div style={{ height: '1000px' }}>
      <TreeGraph
        data={tree.toJson()}
        orientation='vertical'
        dataKey={dataKey}
      />
    </div>
  );
}
