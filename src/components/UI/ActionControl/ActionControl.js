import React from 'react';
import classes from './ActionControl.css';

const actionControl = (props) =>    {

    let attachedClasses = [];
    if (props.action === 'Completed') {
        attachedClasses.push(classes.CompleteActionbtn);
    }
    if (props.action === 'Resumed') {
        attachedClasses.push(classes.ResumeActionbtn);
    }
    if (props.action === 'Deferred') {
        attachedClasses.push(classes.DeferActionbtn);
    }

    console.log("clicked " + props.clicked);
  
   
    attachedClasses = attachedClasses.join(' ');
    return (
        <div className={classes.Action}>  
         <button className={attachedClasses} onClick={()=>props.clicked(props.name, props.action)}>
             <i className={props.iconType}></i></button>  
        </div>
    );
}

export default actionControl;