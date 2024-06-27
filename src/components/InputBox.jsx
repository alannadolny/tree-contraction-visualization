import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  Heading,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import {
  ABSOLUTE,
  FULL,
  LABEL,
  SOLID,
  TAGS_SEPARATOR,
  TEAL,
  TEAL_500,
  WRAP,
  OUTLINE,
} from '../utils/consts';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { QuestionIcon } from '@chakra-ui/icons';
import { getTree } from '../utils/tree';

const InputBox = ({ treeRef, setIteration }) => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (value.includes(TAGS_SEPARATOR)) {
      setTags((prev) => [...prev, { label: value.trimEnd(), key: uuidv4() }]);
      setValue('');
    }
  }, [value]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleTagRemove = (key) => () => {
    setTags((tags) => tags.filter((tag) => tag.key !== key));
  };

  const handleCreateTree = () => {
    const nodes = tags.map((tag) => (tag.label === 'null' ? null : tag.label));
    treeRef.current = getTree(nodes);
    setIteration({ value: 0 });
    setValue('');
    setTags([]);
  };

  return (
    <Box w='calc(100% - 523px)' m={2} position={ABSOLUTE} right={0}>
      <Heading color={TEAL} size='md'>
        {LABEL.INPUT_TITLE}
        <Tooltip label={LABEL.INPUT_TOOLTIP}>
          <QuestionIcon w={4} h={4} mb={1} ml={2} />
        </Tooltip>
      </Heading>
      <Input
        mt={1}
        value={value}
        onChange={handleInputChange}
        focusBorderColor={TEAL_500}
        placeholder={LABEL.ADD_LABEL}
      />
      <HStack mb={2} mt={2} spacing={4} wrap={WRAP}>
        {tags.map((tag) => (
          <Tag
            size='lg'
            key={tag.key}
            borderRadius={FULL}
            variant={SOLID}
            colorScheme={TEAL}
          >
            <TagLabel>{tag.label}</TagLabel>
            <TagCloseButton onClick={handleTagRemove(tag.key)} />
          </Tag>
        ))}
      </HStack>
      <Button
        w={100}
        isDisabled={!tags.length}
        colorScheme={TEAL}
        variant={OUTLINE}
        onClick={handleCreateTree}
      >
        {LABEL.CREATE_TREE}
      </Button>
    </Box>
  );
};

export default InputBox;
