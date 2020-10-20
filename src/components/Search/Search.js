import React from 'react';
import classes from './Search.css';
import Input from '../UI/Input/Input';

const search = (props) => {

    const searchIconStyle = {
        fontSize: '36px',
        backgroundColor: '#357dc0',
        outline: 'none',
        cursor: 'pointer',
        color: 'white'
    };

    if (props.disabled) {
            searchIconStyle.cursor = 'not-allowed';
    }
   
    return (
        <div className={classes.Search}>
            <input className={classes.InputElement} key="search" type="text" placeholder="search goal"
                   onChange={props.changed} />
                                            
            <button className={classes.Button} onClick={props.clicked}>
                <i className="fa fa-search" style={searchIconStyle}></i>
            </button>

            
        </div>
    );
}
export default search;