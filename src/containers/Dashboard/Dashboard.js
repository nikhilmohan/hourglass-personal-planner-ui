import React, { Component } from 'react';
import TextMetric from '../../components/Metrics/TextMetric/TextMetric';
import classes from './Dashboard.css';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import DoughnutMetric from '../../components/Metrics/DoughnutMetric/DoughnutMetric';
import BarMetric from '../../components/Metrics/BarMetric/BarMetric';
import LineMetric from '../../components/Metrics/LineMetric/LineMetric';
import Axios from 'axios';
import { connect } from 'react-redux';


class Dashboard extends Component{
    state = {
        goalSummaryMetric: [],
        goalMonthlyMetric: [],
        taskMonthlyMetric: [],
        goalDistributionMetric: [],
        goalCompletionMetric: [],
        goalLevelMetric: [],
        goalTrendMetric: [],
        fallback: null
           
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
                case 'goalsPlanned' :
                    goalMonthlyMetric.push({label: "Goals planned", value: data[key]});
                    break;                
                case 'goalsAccomplished': 
                    goalMonthlyMetric.push({label: "Goals accomplished", value: data[key]});
                    break;  
                case 'tasksPlanned' :
                    taskMonthlyMetric.push({label: "Tasks planned", value: data[key]});
                    break;                
                case 'tasksCompleted': 
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
                case 'trends':
                    data[key].forEach(obj => {
                        console.log("key " + obj.key + " value " + obj.value);
                        goalTrendMetric.push({label: obj.key, value: obj.value});
                    });
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
        currentState.goalDistributionMetric.forEach(value => console.log("Metric val " + value));
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
        const authHeader = {
            headers: {
                Authorization : 'Bearer ' + this.props.token
            }
        };
        Axios.get('http://gateway-service:9900/dashboard-service/metrics', authHeader)
            .then(response => {
                console.log(response.data);
                console.log("FALLBACK " + response.data.fallback);
                if (response.data.fallback != '')   {
                    this.setState({fallback: response.data.fallback});
                }
                this.createMetricViewData(response.data);
            })
            .catch(err => console.log(err));
       
    }

    render()    {
        const goalDistributionLabels = ['Completed', 'In Progress', 'Deferred'];
        const goalCompletionLabels = ['On time', 'After time'];
        const goalLevelLabels = ['Easy', 'Moderate', 'Extreme'];

        const dashboardView = this.state.fallback ? (<div className={classes.Dashboard}><p>{this.state.fallback}</p> </div>): 
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


        return (
            <div>
                <SectionHeader heading="My activities" />
                {dashboardView}
               
            </div>
        );        

    }
}
const mapStateToProps = state => {
    return {
      id: state.auth.id,
      token: state.auth.token
     
    };
  };
export default connect(mapStateToProps)(Dashboard);