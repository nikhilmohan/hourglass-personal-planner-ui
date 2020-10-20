import React, { Component } from 'react';
import TextMetric from '../../components/Metrics/TextMetric/TextMetric';
import classes from './Dashboard.css';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import DoughnutMetric from '../../components/Metrics/DoughnutMetric/DoughnutMetric';
import BarMetric from '../../components/Metrics/BarMetric/BarMetric';
import LineMetric from '../../components/Metrics/LineMetric/LineMetric';


class Dashboard extends Component{
    state = {
        goalSummaryMetric: [],
        goalMonthlyMetric: [],
        taskMonthlyMetric: [],
        goalDistributionMetric: [],
        goalCompletionMetric: [],
        goalLevelMetric: [],
        goalTrendMetric: []
           
    };
      
    createMetricViewData = (data) => {        
        let currentState = {...this.state};
        let goalSummaryMetric = [];
        let goalMonthlyMetric = [];
        let taskMonthlyMetric = [];
        let goalDistributionMetric = [];
        let goalCompletionMetric = [];
        let goalLevelMetric = [];
        let goalTrendMetric = [];
        Object.keys(data)
        .forEach(function(key){
            switch (key) {
                case 'goalScore' :
                    goalSummaryMetric.push({label: "Total score", value: data[key]});
                    break;                
                case 'averageScore': 
                    goalSummaryMetric.push({label: "Average score", value: data[key]});
                    break; 
                case 'goalTarget' :
                    goalMonthlyMetric.push({label: "Goals planned", value: data[key]});
                    break;                
                case 'goalAccomplished': 
                    goalMonthlyMetric.push({label: "Goals accomplished", value: data[key]});
                    break;  
                case 'taskTarget' :
                    taskMonthlyMetric.push({label: "Tasks planned", value: data[key]});
                    break;                
                case 'taskCompleted': 
                    taskMonthlyMetric.push({label: "Tasks completed", value: data[key]});
                    break; 
                case 'totalGoalsCompleted': 
                    goalDistributionMetric.push(data[key]);
                    break;  
                case 'totalGoalsInProgress' :
                    goalDistributionMetric.push(data[key]);
                    break;                  
                case 'totalGoalsDeferred': 
                    goalDistributionMetric.push(data[key]);
                    break;   
                case 'goalsCompletedOnTime': 
                    goalCompletionMetric.push(data[key]);
                    break;   
                case 'goalsCompletedAfterTime': 
                    goalCompletionMetric.push(data[key]);
                    break;    
                case 'easyGoalsCompleted': 
                    goalLevelMetric.push(data[key]);
                    break;   
                case 'moderateGoalsCompleted': 
                    goalLevelMetric.push(data[key]);
                    break;   
                case 'extremeGoalsCompleted': 
                    goalLevelMetric.push(data[key]);
                    break; 
                default:
                    if (key.startsWith("GoalTrend")) {
                        const label = key.replace("GoalTrend", "");
                        console.log("LabEL " + label);
                        goalTrendMetric.push({label: label, value: data[key]});
                    }
                    break;
            }
        });
        currentState.goalSummaryMetric = goalSummaryMetric;
        currentState.goalMonthlyMetric = goalMonthlyMetric;
        currentState.taskMonthlyMetric = taskMonthlyMetric;
        currentState.goalDistributionMetric = goalDistributionMetric;
        currentState.goalCompletionMetric = goalCompletionMetric;
        currentState.goalLevelMetric = goalLevelMetric;
        currentState.goalTrendMetric = goalTrendMetric;
        this.setState(currentState);
    }

    componentDidMount() {
        const responseData = {
            goalScore: 237,
            averageScore: 42,
            goalTarget: 50,
            goalAccomplished: 28,
            taskTarget: 4,
            taskCompleted: 1,
            totalGoalsCompleted: 54,
            totalGoalsInProgress: 25,
            totalGoalsDeferred: 18,
            goalsCompletedOnTime: 173,
            goalsCompletedAfterTime: 29,
            easyGoalsCompleted: 56,
            moderateGoalsCompleted: 117,
            extremeGoalsCompleted: 29,
            GoalTrendJan: 28,
            GoalTrendFeb: 24,
            GoalTrendMarch: 33
        }
        this.createMetricViewData(responseData)
    }

    render()    {
        const goalDistributionLabels = ['Completed', 'In Progress', 'Deferred'];
        const goalCompletionLabels = ['On time', 'After time'];
        const goalLevelLabels = ['Easy', 'Moderate', 'Extreme'];

        return (
            <div>
                <SectionHeader heading="My activities" />
                <div className={classes.Dashboard}>
                    <TextMetric title='Goal Summary' metric={this.state.goalSummaryMetric}/> 
                    <DoughnutMetric 
                        title='Goal distribution'
                        labels={goalDistributionLabels}
                        data={this.state.goalDistributionMetric}
                    />  
                    <LineMetric
                        title='Goal Trend'
                        data={this.state.goalTrendMetric}
                    />                                    
                </div>
                <div className={classes.Dashboard}>
                    <TextMetric title='Goal this month' metric={this.state.goalMonthlyMetric}/>
                    <TextMetric title='Tasks this month' metric={this.state.taskMonthlyMetric}/>
                    <DoughnutMetric 
                        title='Completed Goals - Schedule'
                        labels={goalCompletionLabels}
                        data={this.state.goalCompletionMetric}
                    />
                    <BarMetric 
                        title='Completed Goals - Level'
                        labels={goalLevelLabels}
                        data={this.state.goalLevelMetric}
                    />
                </div>
            </div>
        );        

    }
}
export default Dashboard;