import { useRef, useState } from 'react';
import { getTree } from '../utils/tree';
import InfoBar from '../components/InfoBar';
import Tree from '../components/Tree';

const Main = () => {
  const treeRef = useRef(getTree());
  const [iteration, setIteration] = useState(0);

  return (
    <div>
      <InfoBar rake={treeRef.current?.rake} setIteration={setIteration} />
      <Tree
        rake={treeRef.current?.rake}
        tree={treeRef.current?.tree}
        iteration={iteration}
      />
    </div>
  );
};

export default Main;
