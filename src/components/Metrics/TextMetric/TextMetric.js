import React from 'react';
import classes from './TextMetric.css';
import TextMetricItem from './TextMetricItem';

const textMetric = (props) => {
    const metric = props.metric
        .map(metric => {
            return <TextMetricItem label={metric.label} value={metric.value} key={metric.label}/>
        })
    return (
        <div className={classes.Container}>
            <p className={classes.Heading}>{props.title}</p>
            <div className={classes.Content}>
                {metric}   
            </div>   
        </div>
    );
}
   
export default textMetric;