import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    console.log("ID: " + this.props.id + " token " + this.props.token);
    this.props.onLogout(this.props.id, this.props.token);
  }
  render()  {
    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => {
  return {
    id : state.auth.id,
    token: state.auth.token
   
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout : (id, token) => dispatch(actions.logout(id, token))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
