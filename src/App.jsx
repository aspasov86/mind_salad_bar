import React, { useEffect } from 'react';
import axios from 'axios';
import { SemanticToastContainer } from 'react-semantic-toasts';
import Router from './AppRouter';
import useToast from './hooks/Toast';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const App = () => {
  const sendToast = useToast();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        if (response.status === 201) sendToast('success');
        return response;
      },
      () => sendToast('error')
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Router />
      <SemanticToastContainer position="bottom-left" />
    </div>
  );
};

export default App;
