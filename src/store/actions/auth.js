import * as actionTypes from '../actions/actionTypes';
import axios from 'axios'

export const authStart =()=>{
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess =(token, userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};


export const authFail=(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout=()=>{
    return {
        type: actionTypes.LOG_OUT
    };
};

export const checkAuthTimeout=(expirationTime)=> {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth =(email, password, isSignup)=>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA4wujsLFC0PF5QYy1oSRUtjbZ5FHUm4sE';
        if(isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA4wujsLFC0PF5QYy1oSRUtjbZ5FHUm4sE';
        }
        axios.post(url, authData).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            dispatch(authFail(error))
        });
    };
};


