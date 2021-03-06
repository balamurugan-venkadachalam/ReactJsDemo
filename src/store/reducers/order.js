import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    orders:[],
    loading: false,
    purchased: false
}


const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const order =(state = initState, action ) => {

    switch(action.type){
        case actionTypes.PURCHASE_INIT:
        return {
            ...state,
            purchased: false
        };
        case actionTypes.PURCHASE_BURGER_START:
        return {
            ...state,
            loading: true
        };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
        
        const newOrder={
            ...action.orderData,
            id: action.orderId,
            purchased: true            
        }
        return {
            ...state,
            loading:false,
            orders: state.orders.concat(newOrder)

        };
        case actionTypes.PURCHASE_BURGER_FAILURE:
        return {
            ...state,
            loading: false
        };
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
        default:
            return state;

    }

}

export default order;