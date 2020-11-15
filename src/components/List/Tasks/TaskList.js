import React, { Component } from 'react';
import Task from './Task';
import SectionHeader from '../../SectionHeader/SectionHeader';
import Modal from '../../UI/Modal/Modal';
import Aux from '../../../hoc/Auxilliary';
import classes from './TaskList.css';
import Button from '../../UI/Button/Button';

const taskList = (props) => {

    let showError = null;

    if (props.error) {          
        showError = <p style={{textAlign: 'center', fontSize: '14px', color: 'salmon'}} >{props.error}</p>;
    }
    const tasks = props.tasks.map(task => {
            return <Task key={task.name} {...task} clicked={props.clicked}/>;
           });
    return (
        <Aux>
            <Modal show = {props.completing} modalClosed = {props.cancelClicked}>
                <div>
                    {showError}
                    <h3>Are you sure you want to complete this task?</h3>
                    <div className={classes.YesNo}>
                        <Button btnType = "Info" clicked={props.completeClicked}>Yes</Button>
                        <Button btnType = "Info" clicked={props.cancelClicked}>No</Button>
                    </div>
                </div>
            </Modal>
            <div>
                <SectionHeader heading="My Tasks" />
                <div className={classes.Tasks}>
                    {tasks}
                </div>
            </div>
        </Aux>
    );
}
export default taskList;
