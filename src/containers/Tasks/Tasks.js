import React, { Component } from 'react';
import moment from 'moment';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Tasks.css';
import TaskList from '../../components/List/Tasks/TaskList';
import Aux from '../../hoc/Auxilliary';

class Tasks extends Component {
    state = {
        tasks: [],
        addTaskForm : {
          name : {
            elementType : 'input',
            elementConfig : {
              type: 'text',
              placeholder: 'task name'
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
              minlength: 5
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
          }
        
        },
        formValidity : false,
        freeze: false,
        completing: false,
        taskToDelete: ''
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

  
    addTaskHandler = (event) => {
        event.preventDefault();
        console.log("Add task!");

        let task = {};

        let formData = {...this.state.addTaskForm};

        
        task.name = formData['name'].value;
        task.description = formData['description'].value;
        let date = moment(formData['dueDate'].value).format("DD/MM/YYYY")
        console.log("due date " + date );
        task.dueDate = date;
        let tasks = [...this.state.tasks];
       
        formData['name'].value = '';
        formData['description'].value = '';
        formData['dueDate'].value = '';
        
        tasks.push(task);
        const freeze = (tasks.length) === 12 ? true : false;
        this.setState({tasks: tasks, addTaskForm: formData, formValidity: false, freeze : freeze});              
        
    }

    inputChangedHandler = (event, inputId) => {
        if (this.state.freeze === true) {
          return;
        }
        const updatedForm = {...this.state.addTaskForm};
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
        this.setState({addTaskForm : updatedForm, formValidity : formValidity});        
        
    }
    componentDidMount () {
         //server call to fetch goals
        const task1 = {
            name: 'File return',
            description: 'File this years IT return',
            dueDate: '15/11/2020'            
        };
        const task2 = {
          name: 'Call tenant',
          description: 'call tenant to sort out final payment',
          dueDate: '20/10/2020'            
        };
        const task3 = {
          name: 'Pay insurance premium',
          description: 'Pay yearly premium',
          dueDate: '22/10/2020'            
        };
      const task4 = {
          name: 'File return1',
          description: 'File this years IT return',
          dueDate: '25/11/2020'            
      };
      const task5 = {
        name: 'Call tenant1',
        description: 'call tenant to sort out final payment',
        dueDate: '26/10/2020'            
      };
      const task6 = {
        name: 'Pay insurance premium1',
        description: 'Pay yearly premium',
        dueDate: '27/10/2020'            
      };
        
        const fetchedTasks = [...this.state.tasks];
        fetchedTasks.push(task1);
        fetchedTasks.push(task2);
        fetchedTasks.push(task3);
        fetchedTasks.push(task4);
        fetchedTasks.push(task5);
        fetchedTasks.push(task6);
        
        let freeze = false;
        let showTaskFreeze = null;
       
        if (this.state.tasks.length === 12) {
          freeze = true;
               
        }
        this.setState({tasks: fetchedTasks, freeze: freeze});
    }

    startCompleteTaskHandler = (taskName) => {
      this.setState({"taskToDelete": taskName, completing: true});
      
    }

    completeTaskHandler = () => {

      let tasks = [...this.state.tasks];

      console.log("TASKS " + tasks.length + " " + this.state.taskToDelete);

      tasks = tasks.filter(task => task.name !== this.state.taskToDelete);
      console.log("TASKS " + tasks.length);
      this.setState({tasks: tasks, completing: false, taskToDelete: ''})
    }

    cancelTaskHandler = () => {
      this.setState({completing: false})
    }

    render()    {
        let inputArray = [];

        for (let input in this.state.addTaskForm) {
            inputArray.push({id : input, config : this.state.addTaskForm[input]});
        }

        const inputElements = inputArray.map(element => {
                                return <Input key = {element.id} type={element.config.elementType}
                                            config={element.config.elementConfig} value={element.config.value}
                                            changed={((event) => this.inputChangedHandler(event, element.id))}
                                            shouldValidate={element.config.validation && element.config.touched}
                                            invalid={!element.config.isValid}/>;
                            });


        const style = {
          textAlign: 'center',
          color: 'red'
        }
        let showTaskFreeze = null;
        if (this.state.freeze) {
          showTaskFreeze = (
            <div style={style}>
              You have 12 tasks! Please complete them to add new ones!
            </div>
          );   
        }      
   

     
 
       return (
           <Aux>
                {showTaskFreeze}
                <div className={classes.Form}>
                    <form onSubmit={this.addTaskHandler}>
                        {inputElements}
                        <Button btnType = "Info" disabled = {!this.state.formValidity}>Add Task</Button>
                    </form>               
                </div>
                <TaskList tasks={this.state.tasks} clicked={this.startCompleteTaskHandler}
                          completeClicked={this.completeTaskHandler}
                          cancelClicked={this.cancelTaskHandler}
                          completing={this.state.completing}/>
              </Aux>
        );
   }
}
export default Tasks;