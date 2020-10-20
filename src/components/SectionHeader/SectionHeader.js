import React from 'react';
import classes from './SectionHeader.css';

const sectionHeader = (props) => {
    let attachedClasses = [];

    attachedClasses.push(classes.Content);
    if (props.showSpecial)  {
        attachedClasses.push(classes.CustomBackground)
    }
    attachedClasses = attachedClasses.join(' ');
    return (<div className={attachedClasses}>
             {props.heading}
            </div>);
}

export default sectionHeader;