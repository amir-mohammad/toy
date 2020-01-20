import React,{useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {LOGIN_ADMIN,LOGOUT_ADMIN} from '../types';
import JwtDecode from 'jwt-decode';

const AuthState = (props) =>{
    const initaialState = {
        user:null
    }

    const [state,dispatch] = useReducer(authReducer,initaialState);

    if(localStorage.getItem('shoppingToken')){
        const decodeToken = JwtDecode(localStorage.getItem('shoppingToken'));
        if(decodeToken.exp *1000 < Date.now()){
            localStorage.removeItem('shoppingToken');
        }else{
            initaialState.user = decodeToken;
        }
    }
    

    const loginUserAdmin = (userData) =>{
        localStorage.setItem('shoppingToken',userData.token);
        dispatch({
            type:LOGIN_ADMIN,
           payload:userData
        })
    }
    const logout = () =>{
        localStorage.removeItem('shoppingToken');
        dispatch({
            type:LOGOUT_ADMIN,
          
        })
    }
    return(
        <AuthContext.Provider value={{
            user:state.user,
            loginUserAdmin,
            logout

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;