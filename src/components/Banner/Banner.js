import React from 'react';
import classes from './Banner.css';
import AppBanner from '../../assets/images/hg-banner.PNG';

const banner = (props) => {
    return (
        <div className={classes.Banner}>
            <img src={AppBanner} alt="Hourglass " />
        </div>
    )
}

export default banner;