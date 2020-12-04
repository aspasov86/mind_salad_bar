import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect, NavLink
} from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Salads from './components/Salads/Salads';
import NewSalad from './components/Salads/NewSalad';
import Ingredients from './components/Ingredients/Ingredients';
import NewIngredient from './components/Ingredients/NewIngredient';

const AppRouter = () => (
  <Router>
    <Menu>
      <Menu.Item as={NavLink} to="/salads">Salads</Menu.Item>
      <Menu.Item as={NavLink} to="/ingredients">Ingredients</Menu.Item>
    </Menu>
    <main>
      <Switch>
        <Route exact path="/salads/new" component={NewSalad} />
        <Route exact path="/salads" component={Salads} />
        <Route exact path="/ingredients/new" component={NewIngredient} />
        <Route exact path="/ingredients" component={Ingredients} />
        <Redirect from="/" to="/salads" />
      </Switch>
    </main>
  </Router>
);

export default AppRouter;
