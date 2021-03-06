import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'
import { authStart } from '../actions/auth';

const initialState ={
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authState = (state, action )=>{
    return updateObject(state, {error:null, loading: true});
}

const authSuccess = (state, action )=>{
    return updateObject(state, {error:null, loading: false, token: action.idToken, userId: action.userId});
}

const authLogOut = (state, action )=>{
    return updateObject(state, {error:null, loading: false, token: null, userId: null});
}

const authFail = (state, action )=>{
    return updateObject(state, {error: action.error, loading: false, token: null, userId: null});
}


const reducer =(state  =initialState, action)=>{
    console.log('auth reducer', action )
    switch(action.type){
        case actionTypes.AUTH_START:
        return  authStart(state, action);

        case actionTypes.AUTH_SUCCESS:
        return authSuccess(state, action);

        case actionTypes.AUTH_FAIL:
        return authFail(state, action)
        case actionTypes.LOG_OUT:
        return authLogOut(state, action)
        
        default:
        return  state;
    }
};

export default reducer;
