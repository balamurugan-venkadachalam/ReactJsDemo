import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';


class ComponentData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                            {value: 'fastest', displayValue:'Fastest'},
                            {value: 'normal', displayValue:'Normal'}
                            ]
                },
                value: '',
                valid: true,
                touched: true
            }                
            
        },
        price:0,
        loading: false,
        formIsValid: false
    }

    orderHandler=(event)=>{
        console.log('inside ContactData orderHandler');
        event.preventDefault();
        const formData = {};

        for(let frmElementIdentifier in this.state.orderForm){
            formData[frmElementIdentifier] = this.state.orderForm[frmElementIdentifier].value;
        }

        console.log(this.props);
        console.log('price = '+ this.props.price);
        console.log(this.props.ingredients);

        this.setState({loading: true});

        const order = {
             ingredients: this.props.ings,
             price: this.props.price,
             orderData: formData
        }
        console.log(order);
        this.props.onOrderBurger(order, this.props.token);

    }

    inputChangeHandler=(event, inputIdentifier)=>{
        console.log(event.target.value);
        console.log(inputIdentifier);
        const updatedOrderForm ={
            ...this.state.orderForm
        }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
   
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log('valid = '+ updatedFormElement.valid);
        console.log('touched = '+ updatedFormElement.touched);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        console.log(updatedOrderForm);

        let formIsValid = true;

        for(let inputIde in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIde].valid && formIsValid;
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        console.log("############");
        console.log(this.state);
        console.log("############");
    }

    checkValidity(value, rule){
        let valid = true;

        if(rule.required){
            valid = value.trim !== '' && valid;
            }
        if(rule.minLength){
            valid = value.trim.length >= rule.minLength && valid;
        }
        if(rule.maxLength){
            valid = value.trim.length <= rule.maxLength && valid;
        }

        return valid;
    }

    render(){
        console.log('inside ComponentData render method');
        const fromElementArray = [];
        for(let key in this.state.orderForm){
            fromElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        console.log(fromElementArray);
        let form = (
            <form onSubmit={this.orderHandler}>
                
                {
                    fromElementArray.map(formElement => (
                        <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig} 
                                value={formElement.config.value} changed={(event) => this.inputChangeHandler(event, formElement.id)}
                                invalid={formElement.config.valid}
                                touched = {formElement.config.touched}
                                shouldValidate ={formElement.config.validation}/>        
                            ))
                }
                <Button btnType="Success"> Order</Button>
            </form>
        );
        if(this.props.loading){
            console.log('loading...');
            form = <Spinner/>
        } 
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data </h4>
                {form}
            </div>
        );
    }

}

const mapsStateToProps = state=> {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token)=> dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(withErrorHandler(ComponentData, axios));