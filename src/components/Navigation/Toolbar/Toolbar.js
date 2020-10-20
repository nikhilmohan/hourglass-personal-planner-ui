import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {

    const attachedClasses = ( props.isAuth) ? 'classes.Nav' : 'classes.OpenNav';

    return (<header className={classes.Toolbar}>
        <Logo />
        <nav className={attachedClasses}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>);
}
export default toolbar;