import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';


export const purchaseBurgerStart =()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }

}



export const purchaseBurgerSuccess =(id, orderData)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed =(error)=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }

}

export const purchaseBurger=(order)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', order).then(response =>{
            console.log(response.data)
            dispatch(purchaseBurgerSuccess(response.data.name, response.data))
            //console.log('this.props => ', this.props);
            //this.props.history.push('/');
        }).catch(error =>{
            console.log(error);
             dispatch(purchaseBurgerFailed(error))
        })
    }
}


export const purchaseInit =()=>{
    return{
        type: actionTypes.PURCHASE_INIT        
    };
};