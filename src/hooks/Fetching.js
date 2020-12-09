import { useState, useEffect } from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import useIsMounted from './isMounted';

function useFetching(fetchFn, fetchOnQ = false) {
  const setStateIfMounted = useIsMounted();
  const [shouldFetch, setShouldFetch] = useState(!fetchOnQ);
  const [data, setData] = useState(null);
  const [showLoader, shouldShowLoader] = useState(true);
  const [loading, setLoading] = useState(!fetchOnQ);
  const history = useHistory();

  const fetch = (withLoader) => {
    setStateIfMounted(shouldShowLoader, !!withLoader);
    setStateIfMounted(setShouldFetch, true);
  };

  useEffect(() => {
    async function asyncFetch() {
      if (shouldFetch) {
        try {
          if (showLoader) setLoading(true);
          const response = await fetchFn();
          setStateIfMounted(setData, response);
        } catch (error) {
          if (get(error, 'response.status') === 404) history.push('/salads');
        } finally {
          setStateIfMounted(setLoading, false);
          setStateIfMounted(setShouldFetch, false);
          setStateIfMounted(shouldShowLoader, true);
        }
      }
    }
    asyncFetch();
  }, [shouldFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  return [data, loading, fetch, setData];
}

export default useFetching;
