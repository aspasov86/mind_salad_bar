import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import vegetables from '../../media/veg.png';
import styles from './MenuBar.module.scss';

const style = {
  width: '100%',
  backgroundImage: `url(${vegetables})`,
  backgroundRepeat: 'repeat-x',
  backgroundSize: '10rem 1rem',
  backgroundPositionY: '.15rem',
  height: '1.5rem'
};

const MenuBar = () => (
  <div>
    <div style={style} />
    <Container>
      <Menu secondary className={styles.menubar}>
        <Menu.Item>
          <Header as="h3">
            <span style={{ color: '#3EB477' }}>Mind</span>
            <span style={{ color: '#FFB926' }}>salad</span>
            <span style={{ color: '#C12B68' }}>bar</span>
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
