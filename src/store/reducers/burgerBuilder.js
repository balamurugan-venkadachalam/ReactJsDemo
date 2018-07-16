import * as actionType from '../actions/actionTypes';

const INGREDIENTS_PRICES = {
    salad: 1.25,
    meat: 1.50,
    cheese:1.50,
    bacon:1.25,
    totalPrice:3
}


const initialState = {
    ingredients:null,
    totalPrice:0,
    error: false
};

const reducer =(state = initialState, action) => {

    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice +  INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionType.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice -  INGREDIENTS_PRICES[action.ingredientName]
        };
        case actionType.SET_INGREDIENTS:
        return {
            ...state,
            ingredients: action.ingredients,
            error: false            
        };
        case actionType.FETCH_INGREDIENTS_FAILED:
        return {
            ...state,
            error: true
                        
        };
        default:
            return state;
    }

}

export default reducer;