import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Salads from './components/Salads/Salads';
import NewSalad from './components/Salads/NewSalad';
import Ingredients from './components/Ingredients/Ingredients';
import NewIngredient from './components/Ingredients/NewIngredient';
import MenuBar from './components/MenuBar/MenuBar';
import Layout from './components/Layout/Layout';

const AppRouter = () => (
  <Router>
    <MenuBar />
    <main>
      <Container>
        <Switch>
          <Route exact path="/salads/new" component={NewSalad} />
          <Route exact path="/salads" component={Salads} />
          <Route exact path="/ingredients/new" component={NewIngredient} />
          <Route exact path="/ingredients" component={Layout} />
          <Redirect from="/" to="/salads" />
        </Switch>
      </Container>
    </main>
  </Router>
);

export default AppRouter;
