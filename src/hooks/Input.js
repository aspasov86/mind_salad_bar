import { useState } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = (event, { value }) => setInputValue(value);

  return [inputValue, inputChangeHandler];
};

export default useInput;
