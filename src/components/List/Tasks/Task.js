import React from 'react';
import classes from './Task.css';
import ActionControl from '../../UI/ActionControl/ActionControl';

const task = (props) => {

    console.log("CLICKED  "+ props.clicked);

    return (<div className={classes.Task}>
                <div className={classes.Title}>{props.name}</div>
                <div className={classes.Description}>{props.description}</div>
                <div className={classes.Date}>{props.dueDate}</div>
                <div className={classes.ActionIcons}>
                    <ActionControl name={props.name}
                                action='Completed'
                                iconType="fas fa-flag-checkered" 
                                clicked={()=>props.clicked(props.name)}/>  
                </div>
          </div>

  )
}

export default task;