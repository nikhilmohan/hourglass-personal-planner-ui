import React from 'react';
import AppLogo from '../../assets/images/hg-logo.PNG';
import classes from './Logo.css';

const logo = (props) => (
  <div className = {classes.Logo}>
    <img src={AppLogo} alt="Hourglass " />
  </div>
);

export default logo;
