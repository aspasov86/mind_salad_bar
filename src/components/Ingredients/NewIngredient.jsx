import React from 'react';
import IngredientsForm from './IngredientsForm';
import { CREATE } from '../../constants/constants';

const NewIngredient = props => <IngredientsForm mode={CREATE} {...props} />;

export default NewIngredient;
