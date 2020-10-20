import React from 'react';
import classes from './Pagination.css';

const pagination = (props) => {

    const PAGE_SIZE = 1;

    const totalPages = Math.ceil(props.goalCount / PAGE_SIZE);

    let pages = [];

    for (let i = 1; i <= totalPages; i++)    {
        pages.push(i);
    }

    console.log("pages " + totalPages);
    
    let attachedClasses = '';

    const pageViews = pages.map(page => {

        attachedClasses = (page == props.currentPage) ? classes.active : '';        
        return (
                <button key={page} className={attachedClasses} onClick={()=>props.clicked(page)}>{page}</button> 
        )});
    
    
    return <div className={classes.Pagination}>
            {pageViews}
          </div>
}
export default pagination;