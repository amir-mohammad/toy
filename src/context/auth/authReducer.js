import {LOGIN_ADMIN,LOGOUT_ADMIN} from '../types';
export default (state,action) =>{
    switch(action.type){

        case LOGIN_ADMIN:
            return{
                ...state,
                user:action.payload
            }
            
        case LOGOUT_ADMIN:
            return{
                ...state,
                user:null
            }    
    }
}