import { useState, useEffect } from 'react';
import useIsMounted from './isMounted';

function useAsyncSave(asyncSaveFn, callbackFN, validator = () => true) {
  const setStateIfMounted = useIsMounted();
  const [shouldSave, setShouldSave] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function asyncFetch() {
      if (shouldSave) {
        try {
          setLoading(true);
          let response = null;
          if (validator()) {
            response = await asyncSaveFn();
          }
          if (response) callbackFN();
        } finally {
          setStateIfMounted(setLoading, false);
          setStateIfMounted(setShouldSave, false);
        }
      }
    }
    asyncFetch();
  }, [shouldSave]); // eslint-disable-line react-hooks/exhaustive-deps

  return [loading, setShouldSave.bind(null, true)];
}

export default useAsyncSave;
