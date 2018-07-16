import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-order';

// const INGREDIENTS_PRICES = {
//     salad: 0.25,
//     meat: 0.50,
//     cheese:0.50,
//     bacon:0.25,
//     totalPrice:3
// }

class BurgerBuilder extends Component {

    state = {
//        ingredients:null,
   //     totalPrice:0,
        showOderSummary:false,
      //  loading: false
    }

    componentDidMount(){
        console.log("*****************");
        console.log(this.props);
        console.log("*****************");
        this.props.onInitIngredients();
        // axios.get('/ingredients.json').then(res=>{
        //     this.setState({ingredients: res.data});
        // }).catch(error => {

        // })

    }

    componentDidUpdate(){

    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    
    //     const additionalPrice = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + additionalPrice;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
   
    //     const additionalPrice = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - additionalPrice;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    handleOrder =() =>{
        this.setState({showOderSummary:true});
    }

    cancelledPurchaseOrderHandler =() =>{
        this.setState({showOderSummary:false});
    }

    continuePurchaseOrderHandler =() =>{
    //    const queryParam = [];

    //    for(let i in this.state.ingredients){
    //        queryParam.push(encodeURIComponent(i) +'='+ encodeURIComponent(this.state.ingredients[i]));
    //    }
    //    queryParam.push('price='+ this.state.totalPrice);
    //    const queryString = queryParam.join('&');


    //    this.props.history.push({
    //        pathname:'/checkout',
    //        search: '?' + queryString
    //    });
    this.props.history.push('/checkout');

    }

    render (){
        const disabledInfo = {
            ...this.props.ings
        }
        // disable/enable button if value is lessthan or equal to zero
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 ;
        }
        let orderSummary = null;
        
        

        let burger = <Spinner />;

        if(this.props.ings) {
            burger = (
                    <Aux>
                        <Burger ingredients = {this.props.ings}/>
                        <div><BuildControls 
                            ingredientsAdded={this.props.onIngredientAdded}
                            ingredientsRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            orderNow={this.handleOrder}/></div>   
                    </Aux>
                );
            orderSummary =   <OrderSummary ingredients={this.props.ings} 
                purchaseCancel={this.cancelledPurchaseOrderHandler}
                purchaseContinue={this.continuePurchaseOrderHandler}
                price={this.props.price.toFixed(2)}></OrderSummary>

            if(this.state.loading){
                orderSummary =<Spinner />;
            }

        }

        return(
            <Aux>
                <Model show={this.state.showOderSummary} modalClosed={this.cancelledPurchaseOrderHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapsStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));