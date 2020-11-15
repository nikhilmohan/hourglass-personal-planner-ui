import React from 'react';
import classes from './GoalSummary.css';


const goalSummary = (props) => {

  console.log("Goal level " + props.level + " status " + props.status);

  let levelIconStyle = '';

  if (props.level === 'Extreme') {
    levelIconStyle = {fontSize:'32px',color: 'darksalmon'}; 
  }
  if (props.level === 'Moderate') {
    levelIconStyle = {fontSize:'24px',color:'orange'}; 
  }
  if (props.level === 'Easy') {
    levelIconStyle = {fontSize:'16px',color:'rgb(236, 222, 22)'}; 
  }

  let attachedClasses = [classes.Name];

  if (props.status === 'C') {
    attachedClasses.push(classes.Completed);
  }

  
  if (props.status === 'D') {
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
