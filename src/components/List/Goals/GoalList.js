import React, { Component } from 'react';
import moment from 'moment';
import Goal from './Goal';
import SectionHeader from '../../SectionHeader/SectionHeader';
import Modal from '../../UI/Modal/Modal';
import Aux from '../../../hoc/Auxilliary';
import GoalNotesForm from './GoalNotesForm';
import classes from './GoalList.css';
import Search from '../../Search/Search';
import Pagination from '../../Pagination/Pagination';
import Axios from 'axios';
import { connect } from 'react-redux';
import { auth } from '../../../store/actions';


class GoalList extends Component {

     state = {
      
        completing: false,

        addGoalNotesForm : {
            note : {
              elementType : 'textarea',
              elementConfig : {
                type: 'text',
                placeholder: 'Enter notes here'
              },
              validation: {
                required : true,
                minlength: 10
                
              },
              isValid : false,
              touched : false,
              value:'',
              noteType: '',
              goal: ''
            }
        },
        searchTerm: '',
        searchDisabled: true,
        currentPage: 1,
        error: null
     }

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

     noteChangedHandler = (event, inputId) => {
         console.log("changed " + event.target.value);

        const updatedForm = {...this.state.addGoalNotesForm};
        const updatedElement = {...updatedForm[inputId]};
        updatedElement.value = event.target.value;
        
        const valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.isValid = valid;
        updatedElement.touched = true;
        updatedForm[inputId] = updatedElement;
        let formValidity = true;
        for (let elem in updatedForm) {
            formValidity = formValidity && updatedForm[elem].isValid;
        }
        console.log("formvalidity " + formValidity);
        this.setState({addGoalNotesForm : updatedForm, formValidity : formValidity, error: null}); 
     }
     startCompleteGoalHandler = (name, action) => {
        this.setState({completing: true});
        const updatedForm = {...this.state.addGoalNotesForm};
        let updatedElement = updatedForm['note'];
        updatedElement.noteType = action;
        updatedElement.goal = name;
        updatedForm['note'] = updatedElement;
        this.setState({completing: true, addGoalNotesForm: updatedForm});
        
     }
     completeGoalHandler = (event, goals, clicked) => {
        event.preventDefault();        
        let addGoalNotesForm = {...this.state.addGoalNotesForm};
        const currentGoal = addGoalNotesForm['note'].goal;
        let updatedGoals = [...goals];
        const updatedGoalIdx = updatedGoals.findIndex(goal => goal.name === currentGoal); 
        console.log(currentGoal + "-" + updatedGoalIdx);       
        let updatedGoal = {...updatedGoals[updatedGoalIdx]};
        if (addGoalNotesForm['note'].noteType === 'Completed') {
            updatedGoal.status = 'C';
            updatedGoal.completedOn = moment(new Date()).format("YYYY-MM-DD");
            updatedGoal.votes = 3;
        }
        if (addGoalNotesForm['note'].noteType === 'Deferred') {
            updatedGoal.status = 'D';
        }
        if (addGoalNotesForm['note'].noteType === 'Resumed') {
            updatedGoal.status = 'A';
        }
       
        const note = addGoalNotesForm['note'].noteType + ': ' + addGoalNotesForm['note'].value;

        updatedGoal.notes = [...updatedGoals[updatedGoalIdx].notes];
        updatedGoal.notes.push(note);
        addGoalNotesForm['note'].value = '';

        const authHeader =  {
            headers:
            {
                Authorization: 'Bearer ' + this.props.token
            }
        } ;
        console.log(updatedGoal);
        Axios.put("http://localhost:9900/goal-service/goal", updatedGoal, authHeader)
            .then(response => {
                console.log(response);
                this.setState({addGoalNotesForm: addGoalNotesForm, completing: false});
                updatedGoals[updatedGoalIdx] = updatedGoal;
                clicked(updatedGoals);
            })
            .catch(err => {
                console.log(err);
                this.setState({error: 'error'});

            });
        
     }
    

    searchChangeHandler = (event) => {
        console.log("search is on! " + event.target.value);
        let disabled = true;
        const searchTerm = event.target.value;
        if ((searchTerm) && searchTerm.trim() !== '') {
            disabled = false;
        }
        this.setState({searchTerm: searchTerm, searchDisabled: disabled});
    }

    pageClickHandler = (page) => {
        console.log("clicked page " + page);
        this.setState({currentPage: page});
        this.props.pageClicked(page);
    }

    cancelCompleteGoalHandler = () => {
        this.setState({completing : false, error: null});
    }
    
    render() {

        let errorText = null;
        let showError = null;
        

        if (this.state.error) {
            errorText = "Goal could not be updated!";
           
            console.log(errorText);
          }

        const noteView = <GoalNotesForm changed={this.noteChangedHandler} 
                                        addGoalNotesForm={this.state.addGoalNotesForm} 
                                        clicked={(event)=>this.completeGoalHandler(event, this.props.goals, this.props.clicked)}
                                        formValidity={this.state.formValidity} error={errorText}/>
     

        const goals = this.props.goals.map(goal => {
            return <Goal key={goal.name} {...goal} clicked={this.startCompleteGoalHandler}/>;
           });
        return (
            <Aux>
                <Modal show = {this.state.completing} modalClosed = {this.cancelCompleteGoalHandler}>
                    {noteView}
                </Modal>
                <div className={classes.Goals}>
                    <SectionHeader heading="My Goals"  />
                    <Search changed={(event)=>this.searchChangeHandler(event)} 
                            clicked={(event)=>this.props.searched(event, this.state.searchTerm)}
                            disabled={false}/>
                    
                        {goals}
                    
                </div>
                <Pagination goalCount = {this.props.totalGoals} 
                            clicked={this.pageClickHandler}
                            currentPage = {this.state.currentPage}                        
                />
            </Aux>
        );
    }
    componentDidMount() {
        console.log("Component did mount called!");
    }
}
const mapStateToProps = state => {
    return {
      id: state.auth.id,
      token: state.auth.token
     
    };
  };
export default connect(mapStateToProps)(GoalList);
