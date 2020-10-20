import React from 'react';
import classes from './GoalActions.css';
import ActionControl from '../../UI/ActionControl/ActionControl';


const goalActions = (props) => {

  let controlOutput = null;
  let votes = null;

  const voteIconStyle = {fontSize: '18px', color: 'gold'};

  const voteIcon = Array.from(Array(props.votes)).map(key => {

             return <i key={key} className='fas fa-award' style={voteIconStyle}>&nbsp;</i>                    
           });

  switch (props.status) {
    case 'Completed':
      controlOutput =   <div className={classes.Date}>
                          <span style={{fontWeight: 'normal'}}>Completed On: </span>{props.completedOn}  
                        </div>;
      votes = <div className={classes.Completion}>
                Votes: {voteIcon}
              </div>      
      break;
    case 'Active': 
      controlOutput =<div className={classes.ActionIcons}>
                          <ActionControl name={props.name}
                                         action='Completed'
                                         iconType="fas fa-flag-checkered" 
                                         clicked={props.clicked}/>  
                          <ActionControl name={props.name}
                                         action='Deferred'
                                         iconType="fas fa-pause" 
                                         clicked={props.clicked}/> 
                      </div>;
      break;
    case 'Deferred':
      controlOutput = <div className={classes.ActionIcons}>
                            <ActionControl name={props.name}
                                           action='Resumed'
                                           iconType="fas fa-play" 
                                           clicked={props.clicked}
                                           /> 
                      </div>;   
  }

  
  return <div className={classes.GoalActions}>{controlOutput}{votes}</div>;

}

export default goalActions;
