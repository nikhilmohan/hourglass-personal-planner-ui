import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';
import Tidbits from '../Tidbits/Tidbits';
import Movies from '../Movies/Movies';
import classes from './Home.css';
import Banner from '../../components/Banner/Banner';

export class Home extends Component {

    
    render()    {
        return (
        <div >
            {this.props.isAuthenticated ?         
            <Dashboard /> : <Banner />}
            <Movies isAuth={this.props.isAuthenticated}/>
            <Tidbits isAuth={this.props.isAuthenticated}/>
        </div>);
    }
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};
export default connect(mapStateToProps)(Home);