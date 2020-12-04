import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';

const AppRouter = () => (
  <Router>
    <main>
      <Switch>
        <Route path="/salads" render={() => <div>Salad</div>} />
        <Route path="/ingredients" render={() => <div>Ingredients</div>} />
        <Redirect to="/salads" />
      </Switch>
    </main>
  </Router>
);

export default AppRouter;
