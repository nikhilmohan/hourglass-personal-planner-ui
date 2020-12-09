import React, { Component } from 'react';
import moment from 'moment';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Tasks.css';
import TaskList from '../../components/List/Tasks/TaskList';
import Aux from '../../hoc/Auxilliary';
import Axios from 'axios';
import { connect } from 'react-redux';

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
        taskToDelete: '',
        addError: null,
        completeError: null
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
        let date = moment(formData['dueDate'].value).format("YYYY-MM-DD")
        console.log("due date " + date );
        task.dueDate = date;
        let tasks = [...this.state.tasks];
       
        formData['name'].value = '';
        formData['description'].value = '';
        formData['dueDate'].value = '';
        
        task.userId = this.props.id;

        const authHeader = {
          headers:
            {
                Authorization: 'Bearer ' + this.props.token
            }
         } ;

        Axios.post("/api/task-service/task/add", task, authHeader)
        .then(response => {
          console.log(response);
          tasks.push(response.data);
          console.log("Task pushed " + response.data.name);
          tasks.forEach(task => console.log(task.name));
          const freeze = (tasks.length) === 12 ? true : false;
          this.setState({tasks: tasks, addTaskForm: formData, formValidity: false, freeze : freeze});  

        })
        .catch(err => {
          console.log(err);
          this.setState({addError: 'Task cannot be added!'});
        });
        
                   
        
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
        this.setState({addTaskForm : updatedForm, formValidity : formValidity, addError: null});        
        
    }
    componentDidMount () {

      
         //server call to fetch tasks

         const authHeader = {
          headers:
            {
                Authorization: 'Bearer ' + this.props.token
            }
         } ;

         Axios.get('/api/task-service/tasks', authHeader)
            .then(response => {
                console.log(response);
                this.setState({tasks : response.data.tasks});
            })
            .catch(err => console.log(err));

      //   const task1 = {
      //       name: 'File return',
      //       description: 'File this years IT return',
      //       dueDate: '15/11/2020'            
      //   };
      //   const task2 = {
      //     name: 'Call tenant',
      //     description: 'call tenant to sort out final payment',
      //     dueDate: '20/10/2020'            
      //   };
      //   const task3 = {
      //     name: 'Pay insurance premium',
      //     description: 'Pay yearly premium',
      //     dueDate: '22/10/2020'            
      //   };
      // const task4 = {
      //     name: 'File return1',
      //     description: 'File this years IT return',
      //     dueDate: '25/11/2020'            
      // };
      // const task5 = {
      //   name: 'Call tenant1',
      //   description: 'call tenant to sort out final payment',
      //   dueDate: '26/10/2020'            
      // };
      // const task6 = {
      //   name: 'Pay insurance premium1',
      //   description: 'Pay yearly premium',
      //   dueDate: '27/10/2020'            
      // };
        
        
        
        let freeze = false;
        let showTaskFreeze = null;
       
        if (this.state.tasks.length === 12) {
          freeze = true;
               
        }
        this.setState({freeze: freeze});
    }

    startCompleteTaskHandler = (taskName) => {
      const taskToDelete = {
        name: taskName
      };
      this.setState({"taskToDelete": taskToDelete, completing: true, completeError: null});
      
    }

    completeTaskHandler = () => {

      let tasks = [...this.state.tasks];

      console.log("TASKS " + tasks.length + " " + this.state.taskToDelete);

      const authHeader = {
        headers:
          {
              Authorization: 'Bearer ' + this.props.token
          }
       } ;

      Axios.post("/api/task-service/task/complete", this.state.taskToDelete, authHeader)
      .then(response => {
        console.log(response);
        tasks = tasks.filter(task => task.name !== this.state.taskToDelete.name);
        console.log("TASKS " + tasks.length);
        this.setState({tasks: tasks, completing: false, taskToDelete: '', completeError: null})

      })
      .catch(err => {
        console.log(err);
        this.setState({completeError: 'Task cannot be completed!'});
      });      
     
    }

    cancelTaskHandler = () => {
      this.setState({completing: false, completeError: null})
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
   
        
        let showError = null;
        if (this.state.addError) {
          
          showError = <p style={{textAlign: 'center', fontSize: '14px', color: 'salmon'}} >{this.state.addError}</p>;
        }
     
 
       return (
           <Aux>
                {showTaskFreeze}
                <div className={classes.Form}>
                    {showError}
                    <form onSubmit={this.addTaskHandler}>
                        {inputElements}
                        <Button btnType = "Info" disabled = {!this.state.formValidity}>Add Task</Button>
                    </form>               
                </div>
                <TaskList tasks={this.state.tasks} clicked={this.startCompleteTaskHandler}
                          completeClicked={this.completeTaskHandler}
                          cancelClicked={this.cancelTaskHandler}
                          completing={this.state.completing}
                          error={this.state.completeError}/>
              </Aux>
        );
   }
}
const mapStateToProps = state => {
  return {
    id: state.auth.id,
    token: state.auth.token
   
  };
};

export default connect(mapStateToProps)(Tasks);