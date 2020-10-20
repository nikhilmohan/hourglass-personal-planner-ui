import React from 'react';
import classes from './Movie.css';
import FavControl from '../UI/FavControl/FavControl';

const movie = (props) => {

    return (<div className={classes.Content}>
                <div className={classes.Image}>
                    <img src={props.item.posterUrl} />
                </div>
                <div className={classes.Title}>{props.item.title}</div>
                <div className={classes.Genre}>{props.item.genre}</div>
                <div className={classes.RatingDetails}>
                    <div>{props.item.certification}</div>
                    <div>{props.item.year}</div> 
                    <div>{props.item.rating} ({props.item.votes})</div>   
                    <div>{props.item.runningTime}</div>    
                </div>
                <div className={classes.Description}>{props.item.description}</div>
                {props.isAuth ? 
                <FavControl clicked={props.clicked} isFavourite={props.item.favourite} /> 
                : null }                        
            </div>);
    
}
export default movie;

