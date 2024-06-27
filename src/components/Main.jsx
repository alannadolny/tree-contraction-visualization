import { useRef, useState } from 'react';
import { getTree } from '../utils/tree';
import InfoBar from '../components/InfoBar';
import Tree from '../components/Tree';
import { Box } from '@chakra-ui/react';
import InputBox from './InputBox';

const Main = () => {
  const treeRef = useRef(getTree());
  const [iteration, setIteration] = useState({ value: 0 });

  return (
    <div>
      <Box>
        <InfoBar
          rake={treeRef.current?.rake}
          setIteration={setIteration}
          iteration={iteration}
        />
        <InputBox treeRef={treeRef} setIteration={setIteration} />
      </Box>
      <Tree
        rake={treeRef.current?.rake}
        tree={treeRef.current?.tree}
        iteration={iteration}
      />
    </div>
  );
};

export default Main;
