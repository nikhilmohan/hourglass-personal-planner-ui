import React from 'react';
import classes from './FavControl.css';

const favControl = (props) =>    {

    console.log("isFav " + props.isFavourite);

    let attachedClasses = [];
    attachedClasses.push(classes.Favbtn);
    if (props.isFavourite)  {
        attachedClasses.push(classes.clicked)
    } else{
        attachedClasses.push(classes.notclicked);
    }
   
    attachedClasses = attachedClasses.join(' ');
    return (
        <div className={classes.Favourite}>  
            <button className={attachedClasses} onClick={props.clicked}><i className="fa fa-heart"></i></button>  
        </div>
    );
}

export default favControl;