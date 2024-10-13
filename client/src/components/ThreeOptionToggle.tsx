// src/components/ThreeOptionToggle.tsx
import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

type ToggleOption = "" | "Full" | "Half" | "Repairs";

interface Props {
  value: ToggleOption;
  onChange: (value: ToggleOption) => void;
}

const ThreeOptionToggle: React.FC<Props> = ({ value, onChange }) => {
  const options: { label: string; value: ToggleOption }[] = [
    { label: "None", value: "" },
    { label: "Full", value: "Full" },
    { label: "Half", value: "Half" },
    { label: "Repairs", value: "Repairs" },
  ];

  return (
    <ButtonGroup isAttached variant="outline" spacing={0}>
      {options.map((option, index) => (
        <Button
          key={option.label}
          onClick={() => onChange(option.value)}
          colorScheme={value === option.value ? "teal" : "gray"}
          borderRightWidth={index < options.length - 1 ? "1px" : "0"}
          _last={{ borderRightWidth: "0" }}
          borderLeftRadius={index === 0 ? "md" : "0"}
          borderRightRadius={index === options.length - 1 ? "md" : "0"}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ThreeOptionToggle;
