import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-semantic-toasts';

const useToast = () => {
  const activeToast = useRef(false);
  const [toastType, setToastType] = useState(null);

  const onClose = () => {
    activeToast.current = false;
    setToastType(null);
  };

  function getOptions(type) {
    switch (type) {
      case 'error':
        return {
          type: 'error',
          title: 'Error',
          description: 'Unknown server error',
          animation: 'fly left',
          time: 0,
          onClose
        };
      case 'create':
        return {
          type: 'success',
          title: 'Success',
          description: 'Successfully added',
          animation: 'fly right',
          time: 2000,
          onClose
        };
      case 'edit':
        return {
          type: 'success',
          title: 'Success',
          description: 'Successfully updated',
          animation: 'fly right',
          time: 2000,
          onClose
        };
      case 'not-found':
        return {
          type: 'error',
          title: 'Not found',
          description: 'Page not found',
          animation: 'fly right',
          time: 2000,
          onClose
        };
      default:
        return null;
    }
  }

  useEffect(() => {
    if (toastType && !activeToast.current) {
      activeToast.current = true;
      toast(getOptions(toastType));
      setToastType(null);
    }
  }, [toastType]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendToast = type => setToastType(type);

  return sendToast;
};

export default useToast;
