import { useRef, useState } from 'react';
import './App.css';
import InfoBar from './InfoBar';
import Tree from './Tree/Tree';
import { getTree } from './Tree/tree';

function App() {
  const treeRef = useRef(getTree());
  const [iteration, setIteration] = useState(0);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <InfoBar rake={treeRef.current?.rake} setIteration={setIteration} />
      <Tree tree={treeRef.current?.tree} iteration={iteration} />
    </div>
  );
}

export default App;
