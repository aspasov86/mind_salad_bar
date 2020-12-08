import React from 'react';
import SaladForm from './SaladForm';
import { CREATE } from '../../constants/constants';

const NewSalad = props => <SaladForm mode={CREATE} {...props} />;

export default NewSalad;
