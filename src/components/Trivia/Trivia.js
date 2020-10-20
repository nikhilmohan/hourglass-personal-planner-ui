import React from 'react';
import classes from './Trivia.css';
import FavControl from '../UI/FavControl/FavControl';

const trivia = (props) => {
    return (<div className={classes.Content}>
                <div className={classes.Image}>
                    <img src={props.item.posterUrl} />
                </div>
                <div className={classes.Topic}>{props.item.topic}</div>
                <div className={classes.Fact}>{props.item.fact}</div>
                {props.isAuth ? 
                <FavControl clicked={props.clicked} isFavourite={props.item.favourite} />   
                : null }                    
            </div>);
}
export default trivia;

