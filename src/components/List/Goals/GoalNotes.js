import React from 'react';
import classes from './GoalNotes.css';




const goalNotes = (props) => {

  
  const showNotes = (props.notes.length) ? 'Notes' : '';

  const notes = props.notes.map(note => {
    return <li key={note}>{note}</li>;
  });

  return (<div className={classes.Notes}>
            {showNotes}
            <div className={classes.Note}>
              <ul className={classes.List}>
              {notes}   
              </ul> 
            </div>           
          </div>

  )
}

export default goalNotes;
