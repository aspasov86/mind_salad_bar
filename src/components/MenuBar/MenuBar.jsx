import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import vegetables from '../../media/veg.png';
import styles from './MenuBar.module.scss';

const MenuBar = () => (
  <div>
    <div
      style={{ backgroundImage: `url(${vegetables})` }}
      className={styles.topTapeImage}
    />
    <Container>
      <Menu secondary className={styles.menubar}>
        <Menu.Item>
          <Header as="h3">
            <span className={styles.firstColor}>Mind</span>
            <span className={styles.secondColor}>salad</span>
            <span className={styles.thirdColor}>bar</span>
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={NavLink} to="/salads">Salads</Menu.Item>
          <Menu.Item as={NavLink} to="/ingredients">Ingredients</Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  </div>
);

export default MenuBar;
