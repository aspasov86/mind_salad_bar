import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';

function useSimpleFormValidation(data) {
  const [errors, setErrors] = useState({});

  useDeepCompareEffectNoCheck(() => {
    if (!isEmpty(errors)) setErrors({});
  }, [data]);

  const checkIfFormValid = () => {
    let noErrors = true;
    const allErrors = {};
    Object.keys(data).forEach((inputName) => {
      if (!data[inputName]) {
        allErrors[inputName] = true;
        noErrors = false;
      }
    });
    setErrors(allErrors);
    return noErrors;
  };
  return [errors, checkIfFormValid];
}

export default useSimpleFormValidation;
