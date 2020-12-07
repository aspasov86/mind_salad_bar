import { useState, useEffect } from 'react';
import useIsMounted from './isMounted';

function useFetching(fetchFn, fetchOnQ = false) {
  const setStateIfMounted = useIsMounted();
  const [shouldFetch, setShouldFetch] = useState(!fetchOnQ);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!fetchOnQ);

  useEffect(() => {
    async function asyncFetch() {
      if (shouldFetch) {
        try {
          setLoading(true);
          const response = await fetchFn();
          setStateIfMounted(setData, response);
        } finally {
          setStateIfMounted(setLoading, false);
          setStateIfMounted(setShouldFetch, false);
        }
      }
    }
    asyncFetch();
  }, [shouldFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  return [data, loading, setShouldFetch.bind(null, true), setData];
}

export default useFetching;
