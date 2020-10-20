import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

   

    render() {
        const attachedClasses = this.props.isAuthenticated ? classes.Content : classes.ContentBanner;
        return (<Aux>
            <Toolbar isAuth = {this.props.isAuthenticated}/>
            <main className={attachedClasses}>
                {this.props.children}
            </main>
        </Aux>);
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};
export default connect(mapStateToProps)(Layout);