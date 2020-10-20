import React from 'react';
import classes from './GoalSummary.css';


const goalSummary = (props) => {

  console.log("Goal level " + props.level);

  let levelIconStyle = '';

  if (props.level === 'extreme') {
    levelIconStyle = {fontSize:'32px',color: 'darksalmon'}; 
  }
  if (props.level === 'moderate') {
    levelIconStyle = {fontSize:'24px',color:'orange'}; 
  }
  if (props.level === 'easy') {
    levelIconStyle = {fontSize:'16px',color:'rgb(236, 222, 22)'}; 
  }

  let attachedClasses = [classes.Name];

  if (props.status === 'Completed') {
    attachedClasses.push(classes.Completed);
  }

  
  if (props.status === 'Deferred') {
    attachedClasses.push(classes.Deferred);
  }

  attachedClasses = attachedClasses.join(' ');

  return (<div className={classes.Summary}>
            <div className={attachedClasses}>
              {props.name} &nbsp; 
              <i className='fas fa-tshirt' style={levelIconStyle}></i>   
            </div>
            <div className={classes.Description}>
              {props.description}     
            </div>
            <div className={classes.Date}>
              <span style={{color: 'black'}}>Due by: </span>{props.dueDate}     
            </div>    
          </div>

  )
}

export default goalSummary;
