import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import classes from './DoughnutMetric.css';
import * as ChartConstants from '../ChartConstants';

const DoughnutMetric = (props) => {

  let goalSummaryData = {
    labels: [],
    datasets: []
  };

  let detailsObject = {};
  detailsObject.label = props.title;
  detailsObject.backgroundColor = ChartConstants.backgroundColor;
  detailsObject.hoverBackgroundColor = ChartConstants.hoverBackgroundColor;
  detailsObject.data = props.data;
  goalSummaryData.labels = props.labels;
  goalSummaryData.datasets.push(detailsObject);  

  const titleStyle = {...ChartConstants.chartTitleStyle, text: props.title};

  return(
    <div className = {classes.Container}>
      <Doughnut 
          data={goalSummaryData}
          options= {{
            legend: {
              display: true
            },
            title: titleStyle
        }}        
      />
    </div>
  );

}
export default DoughnutMetric;   
