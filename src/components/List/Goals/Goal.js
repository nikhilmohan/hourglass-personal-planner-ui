import React from 'react';
import classes from './Goal.css';
import GoalSummary from './GoalSummary';
import GoalNotes from './GoalNotes';
import GoalActions from './GoalActions';



const goal = (props) => {

  let completionOutput = null;
  
  if (props.status === 'C')  {
    const completionDetails = 'Completed on: ' + props.completedOn;
    const votes = ' votes: ' + props.votes;

    completionOutput = (<span className={classes.Description}>{completionDetails}<span />{votes}</span>)
  }
 /*
  return (<div className={classes.Goal}>
            <div className={classes.Container}>
              {props.name}
              {completionOutput}
            </div>
          
          <div className={classes.Description}>{props.description}</div>
          <div className={classes.Description}>Due date: {props.duedate}</div>
        </div>); */
  return (<div className={classes.Goal}>
            <GoalSummary {...props} />
            <GoalNotes notes={props.notes}/>
            <GoalActions name={props.name}
                         status={props.status}
                         completedOn={props.completedOn}
                         votes={props.votes}
                         clicked={props.clicked}
                         />
          </div>

  )
}

export default goal;
