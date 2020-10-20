import React,  { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import Goals from './containers/Goals/Goals';
import Tasks from './containers/Tasks/Tasks';
import Auth from './containers/Auth/Auth';
import Favourites from './containers/Favourites/Favourites';
import Logout from './containers/Auth/Logout';


class App extends Component {
  render() {


    console.log("isAuth", this.props.isAuthenticated);
    const authRouting =  (this.props.isAuthenticated) ?
      <Switch>
        <Route path="/goals" component = {Goals}/>
        <Route path="/tasks" component = {Tasks}/>
        <Route path="/favourites" component = {Favourites}/>
        <Route path="/logout" component = {Logout}/>
        <Route path="/" exact component = {Home}/>
        <Redirect to="/" />
      </Switch>
    : <Switch>
        <Route path="/auth" component = {Auth}/>
        <Route path="/" exact component = {Home}/>
        <Redirect to="/" />
      </Switch>;
    return (
      <div>
        <Layout>
          {authRouting}
        </Layout>
      </div>
    );
  
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  };
};

export default connect(mapStateToProps)(App);

