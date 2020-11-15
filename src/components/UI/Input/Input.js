import React from 'react';
import classes from './Input.css';
import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";


const input = (props) => {
  let inputElement = null;
  const attachedClasses = [classes.InputElement];

  let validationError = null;

  console.log("invalid = " + props.invalid + "  " + props.shouldValidate);

  if (props.invalid && props.shouldValidate) {
    attachedClasses.push(classes.Invalid);
    validationError = <p>Please enter a valid value!</p>;
  }
  switch(props.type) {
    case ('input'):
      inputElement = <input  className={attachedClasses.join(' ')} {...props.config} value={props.value} onChange={props.changed}/>
      break;
    case ('textarea'):
      inputElement = <textarea  className={attachedClasses.join(' ')}  {...props.config} value={props.value} onChange={props.changed}/>
      break;
    case ('select'):
      inputElement = <select  className={attachedClasses.join(' ')} gvalue={props.value} onChange={props.changed}>
                      {props.config.options.map(option => (
                        <option key = {option.value} value={option.value}>{option.displayValue}</option>
                      ))}
                     </select>
      break;
    case ('date'):
      const renderDayContents = (day, date) => {
        const tooltipText = `Tooltip for date: ${date}`;
        return <span title={tooltipText}></span>;
      };
      inputElement =    <DatePicker className={attachedClasses.join(' ')} selected={ props.value } 
                                    onChange={props.changed}
                                    name="startDate"
                                    //minDate={new Date()}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText={props.config.placeholder}
                        />
      break;
    default:
      inputElement = <input className={attachedClasses.join(' ')}  {...props.config} value={props.value}  onChange={props.changed}/>
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}
export default input;
