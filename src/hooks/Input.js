import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const inputChangeHandler = (event, { value }) => setInputValue(value);

  return [inputValue, inputChangeHandler, setInputValue];
};

export default useInput;
