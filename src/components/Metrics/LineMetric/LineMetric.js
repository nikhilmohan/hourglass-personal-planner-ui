import React from 'react';
import { Line } from 'react-chartjs-2';
import classes from './LineMetric.css';
import * as ChartConstants from '../ChartConstants';

const LineMetric = (props) => {

  let goalTrendData = {
    labels: [],
    datasets: []
  };

  let detailsObject = {
    data: []
  };
  detailsObject.label = props.title;
  detailsObject.fill = false;
  detailsObject.borderColor = ChartConstants.borderColor;

  const data = props.data;

  data.forEach(obj => {
      goalTrendData.labels.push(obj.label);
      detailsObject.data.push(obj.value);

      console.log("label " + obj.label + " data " + obj.value);
   });
  goalTrendData.datasets.push(detailsObject);  

  const titleStyle = {...ChartConstants.chartTitleStyle, text: props.title};

  return(
    <div className = {classes.Container}>
      <Line 
          data={goalTrendData}
          options= {{
            legend: {
              display: false
            },
            title: titleStyle,
            scales: {
              xAxes: [{
                  gridLines: {
                      display:true
                  }
              }],
              yAxes: [{
                  gridLines: {
                      display:true
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 10
                  }
              }]
            }
        }}        
      />
    </div>
  );

}
export default LineMetric;   
