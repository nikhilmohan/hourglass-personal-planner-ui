import React from 'react';
import classes from './Favourite.css';
import SciencePoster from '../../assets/images/science.png';
import SportPoster from '../../assets/images/sport.jpg';
import TechnologyPoster from '../../assets/images/technology.jpeg';
import TravelPoster from '../../assets/images/travel.jpg';



const favourite = (props) => {

    console.log("poster " + props.poster);
    let poster = '';

    switch(props.poster)  {
        case 'science': 
            poster = <img src={SciencePoster} />
            break;
        case 'sport': 
            poster = <img src={SportPoster} />
            break;
        case 'technology': 
            poster = <img src={TechnologyPoster} />
            break;
        case 'travel': 
            poster = <img src={TravelPoster} />
            break;
        default:
            poster = <img src={props.poster} />
            break;
    }

    return (<div className={classes.Content}>
                <div className={classes.Image}>
                    {poster}
                </div>
                <div className={classes.Name}>{props.name}</div>
                <div className={classes.Description}>{props.description}</div>                                   
            </div>);
}
export default favourite;

