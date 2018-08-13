import React, {Component} from 'react';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import axios from "axios";
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    state ={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp : true

    }

    switchAuthModeHandler =() => {
        this.setState(prevState => {
            return {
                isSignUp : ! prevState.isSignUp
            };
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler =(event, controlName) =>{
        const updatedControl = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: !this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
            
        };
        this.setState({controls: updatedControl});
    }

    submitHandler =(event)=> {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render(){
        const fromElementArray = [];
        for(let key in this.state.controls){
            fromElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = fromElementArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value} changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={formElement.config.valid}
                touched = {formElement.config.touched}
                shouldValidate ={formElement.config.validation}
            />
        ));


        if(this.props.loading){
            console.log('loading...');
            form = <Spinner/>
        } 

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}>{this.state.isSignUp ? 'SignIn':'SignUp'}</Button>
                </form>
            </div>
        );

    }

}

const mapStateToProps = state => {
    console.log('loading ... ', state);
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Auth);