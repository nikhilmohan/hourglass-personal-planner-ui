import React from 'react';
import { Bar } from 'react-chartjs-2';
import classes from './BarMetric.css';
import * as ChartConstants  from '../ChartConstants' ;

const BarMetric = (props) => {

  let goalDifficultyData = {
    labels: [],
    datasets: []
  };

  let detailsObject = {};
  detailsObject.label = props.title;
  detailsObject.backgroundColor = ChartConstants.backgroundColor;
  detailsObject.hoverBackgroundColor = ChartConstants.hoverBackgroundColor;
  detailsObject.borderWidth = ChartConstants.borderWidth;
  detailsObject.barThickness = ChartConstants.barThickness;
  detailsObject.data = props.data;
  goalDifficultyData.labels = props.labels;
  goalDifficultyData.datasets.push(detailsObject);  

  const titleStyle = {...ChartConstants.chartTitleStyle, text: props.title};

  return(
    <div className = {classes.Container}>
      <Bar 
          data={goalDifficultyData}
          options= {{
            legend: {
              display: false
            },
            title: titleStyle,
            scales: {
              xAxes: [{
                  gridLines: {
                      display:false
                  }
              }],
              yAxes: [{
                  gridLines: {
                      display:false
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 20
                  }  
              }]
            }
        }}        
      />
    </div>
  );

}
export default BarMetric;   
