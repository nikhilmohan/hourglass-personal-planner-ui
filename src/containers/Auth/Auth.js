import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxilliary';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state = {
        user: '',
        loggedIn: false,
        token: '',
        loginForm : {
          email : {
            elementType : 'input',
            elementConfig : {
              type: 'email',
              placeholder: 'email'
            },
            validation: {
              required : true
            },
            isValid : false,
            touched : false,
            value:''
          },
          password : {
            elementType : 'input',
            elementConfig : {
              type: 'password',
              placeholder: 'password'
            },
            validation: {
              required : true,
              minlength: 6
            },
            isValid : false,
            touched : false,
            value:''
          }
        },
        signupForm : {
            email : {
              elementType : 'input',
              elementConfig : {
                type: 'email',
                placeholder: 'email'
              },
              validation: {
                required : true
              },
              isValid : false,
              touched : false,
              value:''
            },
            password : {
              elementType : 'input',
              elementConfig : {
                type: 'password',
                placeholder: 'password'
              },
              validation: {
                required : true,
                minlength: 6
              },
              isValid : false,
              touched : false,
              value:''
            },
            confirmPassword : {
                elementType : 'input',
                elementConfig : {
                  type: 'password',
                  placeholder: 'password'
                },
                validation: {
                  required : true,
                  minlength: 6
                },
                isValid : false,
                touched : false,
                value:''
              }              
          },
        formValidity : false,
        processing: true,
        showLogin: true,
        signupComplete: false
      };

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

  
    loginHandler = (event) => {
        event.preventDefault();
        console.log("Add task!");

        let auth = {};

        let loginData = {...this.state.loginForm};

             
        auth.email = loginData['email'].value;
        auth.password = loginData['password'].value;
       
        // server call
        this.props.onAuth(auth.email, auth.password, false)
       
        this.setState({user: 'Nikhil', token: 'abc', loggedIn: true});     
        this.props.history.replace('/');         
        
    }

    handleInputChange(event, updatedForm, inputId) {
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
        this.setState({formValidity: formValidity});
        return updatedForm;
    }

    loginInputChangedHandler = (event, inputId) => {
       
        let updatedForm = {...this.state.loginForm};
        updatedForm = this.handleInputChange(event, updatedForm, inputId);
        this.setState({loginForm : updatedForm});   
        console.log("Logged in!");     
        
    }

    signupInputChangedHandler = (event, inputId) => {
       
        let updatedForm = {...this.state.signupForm};
        updatedForm = this.handleInputChange(event, updatedForm, inputId);
        this.setState({signupForm : updatedForm});   
        console.log("signed in!");     
        
    }


    cancelLoginHandler = () => {
        this.setState({processing : false});
        this.props.history.replace('/');
        //redict to /
    }

    showSignupHandler = () => {
        
        this.setState({showLogin: false});

    }

    signupHandler = (event) => {
        event.preventDefault();
        console.log("signup");

        let auth = {};

        let signupData = {...this.state.signupForm};

        auth.email = signupData['email'].value;
        auth.password = signupData['password'].value;
        auth.confirmPassword = signupData['confirmPassword'].value;

       
        // server call

       
        this.setState({user: 'Nikhil', token: 'abc', loggedIn: true, signupComplete: true}); 
        this.props.history.replace('/');

        
    }
  
    getInputElements(form, inputChanged)  {
        let inputArray = [];

        for (let input in form) {
            inputArray.push({id : input, config : form[input]});
        }

        let inputElements = inputArray.map(element => {
                                return <Input key = {element.id} type={element.config.elementType}
                                            config={element.config.elementConfig} value={element.config.value}
                                            changed={((event) => inputChanged(event, element.id))}
                                            shouldValidate={element.config.validation && element.config.touched}
                                            invalid={!element.config.isValid}/>;
                            });
        return inputElements;
    }

    render()    {
        console.log("in render " + this.state.processing);

        let formView = null;
        let inputElements = [];

        if (this.state.showLogin)   {
            inputElements = this.getInputElements(this.state.loginForm, this.loginInputChangedHandler);
        
            formView = (<Aux>
                            <div className={classes.Form}>
                                <form onSubmit={this.loginHandler}>
                                    {inputElements}
                                    <Button btnType = "Info" disabled = {!this.state.formValidity}>Login</Button>
                                    
                                </form>               
                            </div>  
                            <hr/>
                            <form style={{textAlign: 'center', fontSize: '14px', color: '#1460a7'}}
                                onSubmit={this.showSignupHandler}> 
                                <p>Do you want to register?</p>
                                <Button btnType = "Outline" disabled={false}>Sign Up</Button> 
                            </form> 
                        </Aux>);
        } else {
            if (!this.state.signupComplete) {
                inputElements = this.getInputElements(this.state.signupForm, this.signupInputChangedHandler);
                    formView = (
                        <Aux>
                            <div className={classes.Form}>
                                <form onSubmit={this.signupHandler}>
                                    {inputElements}
                                    <Button btnType = "Info" disabled = {!this.state.formValidity}>Sign Up</Button>                            
                                </form>               
                            </div>  
                        </Aux>
                    );
            }
            else {

                const iconStyle = {textAlign: 'center', 
                             fontSize: '64px', 
                             color: 'green',
                             display: 'inline-block',
                             width: '100%',
                             fontWeight: 'bold'};

                formView = (
                    <Aux>
                        <i className="fa fa-check" style={iconStyle}></i>
                        <p style={{textAlign: 'center', fontSize: '14px', color: '#1460a7'}}>
                            Signup completed successfully!
                        </p>
                    </Aux>
                );
            }
        }     
            
        

        return (
                <Modal show = {this.state.processing} modalClosed = {this.cancelLoginHandler}>               
                    {formView}         
                </Modal>
        );
   }
}

const mapStateToProps = state => {
    return {
      error : state.auth.error,
      isAuthenticated : state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuth : (email, password, signup) => dispatch(actions.auth(email, password, signup))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
