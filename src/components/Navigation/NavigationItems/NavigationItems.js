import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';


const navigationItems = (props) => {

  
  return (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Home</NavigationItem>
    {props.isAuth ? 
    <NavigationItem link="/goals">Goals</NavigationItem> 
    : null}
    {props.isAuth ? 
    <NavigationItem link="/tasks">Tasks</NavigationItem>
    : null }
    {props.isAuth ? 
    <NavigationItem link="/favourites">Favourites</NavigationItem> 
    : null }
    {props.isAuth ? 
    <NavigationItem link="/logout">Logout</NavigationItem>
    : <NavigationItem link="/auth">Login</NavigationItem>}
  </ul>
 );
}

export default navigationItems;
