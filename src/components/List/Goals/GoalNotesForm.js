import React from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './GoalNotesForm.css';

const goalNotesForm = (props) => {

    let showError = null;

    if (props.error) {
        
        showError =  <p style={{textAlign: 'center', fontSize: '14px', color: 'salmon'}}>{props.error}</p>;
        console.log(props.error);
      }


    let inputArray = [];
    console.log("GoalNotesForm " + props.clicked);

    for (let input in props.addGoalNotesForm) {
        inputArray.push({id : input, config : props.addGoalNotesForm[input]});
    }

    const inputElements = inputArray.map(element => {
                            return <Input key = {element.id} type={element.config.elementType}
                                        config={element.config.elementConfig} value={element.config.value}
                                        changed={((event) => props.changed(event, element.id))}
                                        shouldValidate={element.config.validation && element.config.touched}
                                        invalid={!element.config.isValid}/>;
                        });
    
    return(
        <div>
            
            <form  onSubmit={props.clicked} className={classes.Form}>
                {showError}
                {inputElements}
                <Button btnType = "Info" 
                        disabled = {!props.formValidity}
                        >Add Note</Button>
            </form>               
        </div>
    );
}
export default goalNotesForm;