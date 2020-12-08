import { useState, useEffect } from 'react';

const useInput = (defaultValue = '', assignedValue = null) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (![null, undefined].includes(assignedValue)) {
      setInputValue(assignedValue);
    }
  }, [assignedValue]);

  const inputChangeHandler = (event, { value }) => setInputValue(value);

  return [inputValue, inputChangeHandler, setInputValue];
};

export default useInput;
