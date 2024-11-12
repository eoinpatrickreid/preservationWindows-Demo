import React, { useState } from 'react';
import MultiOptionToggle from './MultiOptionToggle';

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('Option1');

  const options = [
    { label: 'Option 1', value: 'Option1' },
    { label: 'Option 2', value: 'Option2' },
    { label: 'Option 3', value: 'Option3' },
  ];

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <h1>Selected Value: {selectedValue}</h1>
      <MultiOptionToggle
        options={options}
        value={selectedValue}
        onChange={handleChange}
        bg="gray.200"
      />
    </div>
  );
};

export default App;