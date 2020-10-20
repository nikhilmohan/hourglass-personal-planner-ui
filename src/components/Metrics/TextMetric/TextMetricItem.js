import React from 'react';
import classes from './TextMetricItem.css';

const textMetricItem = (props) => {
    return (
    <div className={classes.Content}>
        <div className={classes.Metric}>{props.value}</div>
        <div className={classes.Label}>{props.label}</div>                  
    </div>

    )
}
   
export default textMetricItem;