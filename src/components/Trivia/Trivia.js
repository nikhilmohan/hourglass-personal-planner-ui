import React from 'react';
import classes from './Trivia.css';
import FavControl from '../UI/FavControl/FavControl';
import SciencePoster from '../../assets/images/science.png';
import SportPoster from '../../assets/images/sport.jpg';
import TechnologyPoster from '../../assets/images/technology.jpeg';
import TravelPoster from '../../assets/images/travel.jpg';



const trivia = (props) => {

    console.log("Category " + props.item.category);
    let logo = '';

    switch(props.item.category)  {
        case 'science': 
            logo = <img src={SciencePoster} />
            break;
        case 'sport': 
            logo = <img src={SportPoster} />
            break;
        case 'technology': 
            logo = <img src={TechnologyPoster} />
            break;
        case 'travel': 
            logo = <img src={TravelPoster} />
            break;
    }
    
    return (<div className={classes.Content}>
                <div className={classes.Image}>
                    {logo}
                </div>
                <div className={classes.Topic}>{props.item.term}</div>
                <div className={classes.Fact}>{props.item.fact}</div>
                {props.isAuth ? 
                <FavControl clicked={props.clicked} isFavourite={props.item.favourite} />   
                : null }                    
            </div>);
}
export default trivia;

