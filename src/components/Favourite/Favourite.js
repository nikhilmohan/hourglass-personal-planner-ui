import React from 'react';
import classes from './Favourite.css';

const favourite = (props) => {
    return (<div className={classes.Content}>
                <div className={classes.Image}>
                    <img src={props.posterUrl} />
                </div>
                <div className={classes.Name}>{props.name}</div>
                <div className={classes.Description}>{props.description}</div>                                   
            </div>);
}
export default favourite;

