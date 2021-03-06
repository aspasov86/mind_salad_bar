import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Salads from './components/Salads/Salads';
import NewSalad from './components/Salads/NewSalad';
import EditSalad from './components/Salads/EditSalad';
import Ingredients from './components/Ingredients/Ingredients';
import NewIngredient from './components/Ingredients/NewIngredient';
import EditIngredient from './components/Ingredients/EditIngredient';
import MenuBar from './components/MenuBar/MenuBar';

const AppRouter = () => (
  <Router>
    <MenuBar />
    <main>
      <Container>
        <Switch>
          <Route exact path="/salads/new" component={NewSalad} />
          <Route exact path="/salads/:id" component={EditSalad} />
          <Route exact path="/salads" component={Salads} />
          <Route exact path="/ingredients/new" component={NewIngredient} />
          <Route exact path="/ingredients/:id" component={EditIngredient} />
          <Route exact path="/ingredients" component={Ingredients} />
          <Redirect from="/" to="/salads" />
        </Switch>
      </Container>
    </main>
  </Router>
);

export default AppRouter;
