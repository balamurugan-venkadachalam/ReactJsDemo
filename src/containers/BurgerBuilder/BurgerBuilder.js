import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
    salad: 0.25,
    meat: 0.50,
    cheese:0.50,
    bacon:0.25,
    totalPrice:3
}

class BurgerBuilder extends Component {

    state = {
        ingredients:null,
        totalPrice:0,
        showOderSummary:false,
        loading: false
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(res=>{
            this.setState({ingredients: res.data});
        }).catch(error => {

        })

    }

    componentDidUpdate(){

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
    
        const additionalPrice = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + additionalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
   
        const additionalPrice = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - additionalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients){
      const sum =  Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        },0 );
        this.setState({purchasable: sum > 0});

    }

    handleOrder =() =>{
        this.setState({showOderSummary:true});
    }

    cancelledPurchaseOrderHandler =() =>{
        this.setState({showOderSummary:false});
    }

    continuePurchaseOrderHandler =() =>{
       //alert('Continue');
       this.setState({loading: true});
       const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'bala',
                address: {
                            street: '1 first street',
                            city: 'mycity',
                            zip: 6001
                        },
                deliveryMethod: 'Urgent'                
            }
       }
       axios.post('/orders.json', order).then(response =>{
           console.log(response.data)
           this.setState({loading: false, showOderSummary:false});
       }).catch(error =>{
            this.setState({loading: false, showOderSummary:false});
            console.log(error);
       })
    }

    render (){
        const disabledInfo = {
            ...this.state.ingredients
        }
        // disable/enable button if value is lessthan or equal to zero
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 ;
        }
        let orderSummary = null;


        let burger = <Spinner />;
        if(this.state.ingredients) {
            burger = (
                    <Aux>
                        <Burger ingredients = {this.state.ingredients}/>
                        <div><BuildControls 
                            ingredientsAdded={this.addIngredientHandler}
                            ingredientsRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable = {!this.state.purchasable}
                            orderNow={this.handleOrder}/></div>   
                    </Aux>
                );
            orderSummary =   <OrderSummary ingredients={this.state.ingredients} 
                purchaseCancel={this.cancelledPurchaseOrderHandler}
                purchaseContinue={this.continuePurchaseOrderHandler}
                price={this.state.totalPrice.toFixed(2)}></OrderSummary>

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

export default withErrorHandler(BurgerBuilder, axios);