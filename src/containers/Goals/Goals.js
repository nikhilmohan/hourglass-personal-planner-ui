import React, { Component } from 'react';
import moment from 'moment';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Goals.css';
import GoalList from '../../components/List/Goals/GoalList';
import Aux from '../../hoc/Auxilliary';

class Goals extends Component {
    state = {
        goals: [],
        addGoalForm : {
          name : {
            elementType : 'input',
            elementConfig : {
              type: 'text',
              placeholder: 'goal name'
            },
            validation: {
              required : true,
              minlength: 5
              
            },
            isValid : false,
            touched : false,
            value:''
          },
          description : {
            elementType : 'textarea',
            elementConfig : {
              type: 'text',
              placeholder: 'description'
            },
            validation: {
              required : true,
              minlength: 20
            },
            isValid : false,
            touched : false,
            value:''
          },
          dueDate : {
            elementType : 'date',
            elementConfig : {
              type: 'text',
              placeholder: 'due date'
            },
            validation: {
              required : true
            },
            isValid : false,
            touched : false,
            value: ''
          },
          level : {
            elementType : 'select',
            elementConfig : {
                options: [
                    {value: 'easy', displayValue: 'easy'},
                    {value: 'moderate', displayValue: 'moderate'},
                    {value: 'extreme', displayValue: 'extreme'}
                  ],
              placeholder: 'level'
            },
            validation: {},
            isValid : true,
            value: 'easy'
          }
        },
        formValidity : false,
        completing: true,
        activePage: 1
      };

    checkValidity(value, rules) {
        console.log("Check validity " + value)
        let isValid = true;
        if (rules) {
            if ((rules.required) &&
                 (Object.prototype.toString.call(value) !== '[object Date]'))   {
               isValid = value.trim() !== '' && isValid;
            }
            if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
            }
            if (rules.maxlength) {
            isValid = value.length <= rules.minlength && isValid;
            }
        }
        return isValid;
    }

    addGoalHandler = (event) => {
        event.preventDefault();
        console.log("Add goal!");

        let goal = {};

        
        goal.name = this.state.addGoalForm['name'].value;
        goal.description = this.state.addGoalForm['description'].value;
        goal.level = this.state.addGoalForm['level'].value;
        goal.status = 'Active';
        goal.votes = null;
        goal.completedOn = '';
        goal.notes = [];   
        let date = moment(this.state.addGoalForm['dueDate'].value).format("DD/MM/YYYY")
        console.log("due date " + date );
        goal.dueDate = date;
        let goals = [...this.state.goals];
       
       
        goals.push(goal);
        this.setState({goals: goals});       
        
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = {...this.state.addGoalForm};
        const updatedElement = {...updatedForm[inputId]};
        console.log("Date val: " + updatedElement.value);
        if (inputId === 'dueDate')  {
            updatedElement.value = event;            
        } else {
            updatedElement.value = event.target.value;
        }
        const valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.isValid = valid;
        updatedElement.touched = true;
        updatedForm[inputId] = updatedElement;
        let formValidity = true;
        for (let elem in updatedForm) {
            formValidity = formValidity && updatedForm[elem].isValid;
        }
        this.setState({addGoalForm : updatedForm, formValidity : formValidity});        
        
    }
    componentDidMount () {
         //server call to fetch goals
         const goal = {
            name: 'Do microservices',
            description: 'End to end microservices dev and deploy with best practices on cloud!',
            dueDate: '15/10/2020',
            level: 'extreme',
            status: 'Completed',
            completedOn: '14/10/2020',
            votes: 3,
            notes: []
        };
        const goal1 = {
            name: 'Do microservices again',
            description: 'End to end microservices dev and deploy with best practices on cloud!',
            dueDate: '15/10/2020',
            level: 'easy',
            status: 'Active',
            completedOn: '',
            votes: null,
            notes: []
        };
        const goal2 = {
            name: 'Do microservices again!',
            description: 'End to end microservices dev and deploy with best practices on cloud!',
            dueDate: '15/11/2020',
            level: 'moderate',
            status: 'Deferred',
            completedOn: '',
            votes: null,
            notes: []
        };
        const fetchedGoals = this.state.goals;
        fetchedGoals.push(goal);
        fetchedGoals.push(goal1);
        fetchedGoals.push(goal2);
        this.setState({goals: fetchedGoals});
    }

    completeGoalHandler = (goals) => {
         console.log("Gets here");      
        this.setState({goals : goals});
    }

    searchGoalHandler = (event, searchText) => {
        console.log("search is on!" + searchText);
        //call server with search text
    }
    pageChangeHandler = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render()    {
        let inputArray = [];

        for (let input in this.state.addGoalForm) {
            inputArray.push({id : input, config : this.state.addGoalForm[input]});
        }

        const inputElements = inputArray.map(element => {
                                return <Input key = {element.id} type={element.config.elementType}
                                            config={element.config.elementConfig} value={element.config.value}
                                            changed={((event) => this.inputChangedHandler(event, element.id))}
                                            shouldValidate={element.config.validation && element.config.touched}
                                            invalid={!element.config.isValid}/>;
                            });
 
       return (
           <Aux>
                
                <div className={classes.Form}>
                    <form onSubmit={this.addGoalHandler}>
                        {inputElements}
                        <Button btnType = "Info" disabled = {!this.state.formValidity}>Add Goal</Button>
                    </form>               
                </div>
                <GoalList goals={this.state.goals} clicked={this.completeGoalHandler} 
                                                   searched={this.searchGoalHandler}
                                                   />
                
            </Aux>
        );
   }
}
export default Goals;