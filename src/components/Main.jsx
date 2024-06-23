import { useRef, useState } from 'react';
import { getTree } from '../utils/tree';
import InfoBar from '../components/InfoBar';
import Tree from '../components/Tree';

const Main = () => {
  const treeRef = useRef(getTree());
  const [iteration, setIteration] = useState(0);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <InfoBar rake={treeRef.current?.rake} setIteration={setIteration} />
      <Tree tree={treeRef.current?.tree} iteration={iteration} />
    </div>
  );
};

export default Main;
