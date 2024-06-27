import { useEffect, useState } from 'react';
import { LABEL } from '../utils/consts';
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Box,
  Text,
  StackDivider,
  Button,
} from '@chakra-ui/react';

const InfoBar = ({ rake, setIteration }) => {
  const [toRake, setToRake] = useState([]);
  const [toRakeOdd, setToRakeOdd] = useState([]);
  const [toRakeEven, setToRakeEven] = useState([]);
  const [leavesToRakeFromLeftBranches, setLeavesToRakeFromLeftBranches] =
    useState([]);
  const [otherLeavesToRake, setOtherLeavesToRake] = useState([]);

  useEffect(() => {
    calculateRakeInfo();
  }, []);

  const calculateRakeInfo = () => {
    const { even, odd, leavesToRake, left, right } = rake?.getRakeInfo();
    setToRakeEven(even);
    setToRakeOdd(odd);
    setToRake(leavesToRake);
    setLeavesToRakeFromLeftBranches(left);
    setOtherLeavesToRake(right);
  };

  const displayLeaves = (leaves) => {
    return `[${leaves.map((leaf) => leaf.value).join(', ')}]`;
  };

  const rakeTree = () => {
    rake.rake();
    calculateRakeInfo();
    setIteration((iteration) => iteration + 1);
  };

  return (
    <Box position='absolute' m={2}>
      <Card mb={2} minWidth={500}>
        <CardHeader>
          <Heading size='md'>{LABEL.INFO_BAR_TITLE}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                {LABEL.TO_RAKE}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {displayLeaves(toRake)}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                {LABEL.A}
                <sub>{LABEL.ODD}</sub>
              </Heading>
              <Text pt='2' fontSize='sm'>
                {displayLeaves(toRakeOdd)}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                {LABEL.A}
                <sub>{LABEL.EVEN}</sub>
              </Heading>
              <Text pt='2' fontSize='sm'>
                {displayLeaves(toRakeEven)}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                {LABEL.CONCURENT_RAKES}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {LABEL.A_BRACKET} {displayLeaves(leavesToRakeFromLeftBranches)}
              </Text>
              <Text pt='2' fontSize='sm'>
                {LABEL.B_BRACKET} {displayLeaves(otherLeavesToRake)}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Button
        isDisabled={rake.isRakeFinished()}
        onClick={rakeTree}
        colorScheme='teal'
        variant='outline'
        w='100%'
      >
        Rake
      </Button>
    </Box>
  );
};

export default InfoBar;
