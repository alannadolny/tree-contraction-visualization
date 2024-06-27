import { Text } from '@chakra-ui/react';
import { END } from '../utils/consts';

const TreeNode = ({ nodeDatum }) => (
  <g>
    {console.log(nodeDatum?.color)}
    <circle fill={nodeDatum?.color} r={15}></circle>
    <foreignObject height={50} width={50}>
      <Text textAlign={END}>{nodeDatum?.name}</Text>
    </foreignObject>
  </g>
);

export default TreeNode;
