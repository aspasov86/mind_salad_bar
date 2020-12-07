import React from 'react';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import Spinner from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';

const Loader = () => (
  <Dimmer active inverted>
    <Spinner size="large" style={{ top: '20%' }} />
  </Dimmer>
);

export default Loader;
