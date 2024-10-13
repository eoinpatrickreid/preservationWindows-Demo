// src/components/MultiOptionToggle.tsx

import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

type OptionValue = string;

interface Option {
  label: string;
  value: OptionValue;
}

interface Props {
  options: Option[];
  value: OptionValue;
  onChange: (value: OptionValue) => void;
  bg?: string; // Add bg prop
}

const MultiOptionToggle: React.FC<Props> = ({ options, value, onChange, bg }) => {
  return (
    <ButtonGroup isAttached variant="outline" spacing={0}>
      {options.map((option, index) => {
        const isSelected = value === option.value;
        return (
          <Button
            key={option.value}
            onClick={() => onChange(option.value)}
            colorScheme={isSelected ? 'teal' : 'gray'}
            bg={isSelected ? 'teal.500' : bg || 'white'}
            color={isSelected ? 'white' : 'black'}
            _hover={{ bg: isSelected ? 'teal.600' : 'gray.100' }}
            borderRightWidth={index < options.length - 1 ? '1px' : '0'}
            _last={{ borderRightWidth: '0' }}
            borderLeftRadius={index === 0 ? 'md' : '0'}
            borderRightRadius={index === options.length - 1 ? 'md' : '0'}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default MultiOptionToggle;
