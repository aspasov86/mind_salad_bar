import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';

function useFormStateChangeChecker(startingState, currentState) {
  const [saveDisabled, setSaveDisabled] = useState(false);

  useEffect(() => {
    setSaveDisabled(isEqual(currentState, startingState));
  }, [currentState, startingState]);

  return saveDisabled;
}

export default useFormStateChangeChecker;
