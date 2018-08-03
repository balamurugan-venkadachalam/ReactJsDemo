import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class Checkout extends Component {

    // componentDidMount(){
    //     this.props.onInitPurchase();
    // }

    // state = {
    //     ingredients:{
    //         salad:1,
    //         meat:1,
    //         bacon:1,
    //         cheese:1
    //     },
    //     totalPrice:0
    // }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients});
    //     this.setState({totalPrice: price});
    // }
    
    checkoutCanceledHandler=()=>{
        console.log('inside checkoutCanceledHandler');
        this.props.history.goBack();
    }

    checkoutContinuedHandler =()=>{
        console.log('inside checkoutContinuedHandler');
        this.props.history.replace('/checkout/contact-data');
    }

    
//render={(props)=> (<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}

render(){
    let summary = <Redirect  to="/"/>;
    if(this.props.ings){
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        summary =   (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients = {this.props.ings} 
                    checkoutCanceled={this.checkoutCanceledHandler} 
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path +'/contact-data'} 
                component={ContactData}/>
            </div>
        );
    }
    console.log('Summary ', summary)
    return summary;
}

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};




export default connect(mapStateToProps) (Checkout);