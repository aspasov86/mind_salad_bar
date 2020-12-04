import React, { useEffect } from 'react';
import axios from 'axios';
import Router from './AppRouter';

const App = () => {
  useEffect(() => {
    axios.get('/salads').then(console.log);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
