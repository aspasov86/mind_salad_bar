import { useState, useEffect } from 'react';

const useMultiselect = (defaultValue = '', defaultOptions = [], assignedValue = null) => {
  const [options, setOptions] = useState(defaultOptions);
  const [ddValue, setDdValue] = useState(defaultValue);

  useEffect(() => {
    if (![null, undefined].includes(assignedValue)) {
      setOptions([...assignedValue.map(tag => ({ key: tag, value: tag, text: tag })), ...options]);
      setDdValue(assignedValue);
    }
  }, [assignedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const onAddItem = (event, { value }) => setOptions([{ text: value, value }, ...options]);
  const onDdValueChange = (event, { value }) => setDdValue(value);
  return [ddValue, onDdValueChange, options, onAddItem];
};

export default useMultiselect;
