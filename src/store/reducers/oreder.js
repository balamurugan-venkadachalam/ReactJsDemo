import * as actionType from '../actions/actionTypes';

const initState = {
    orders:[],
    loading: false
}

const order =(state = initState, action ) => {

    switch(action.type){

        case actionType.PURCHASE_BURGER_START:
        return {
            ...state,
            loading: true
        };
        case actionType.PURCHASE_BURGER_SUCCESS:
        
        const newOrder={
            ...action.orderData,
            id: action.orderId            
        }
        return {
            ...state,
            loading:false,
            orders: state.orders.concat(newOrder)

        };
        case actionType.PURCHASE_BURGER_FAILURE:
        return {
            ...state,
            loading: false
        };
        default:
            return state;

    }

}

export default order;