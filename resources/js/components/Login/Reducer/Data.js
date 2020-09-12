import * as LoginAction from '../Container/LoginController';

const initialStateData = {
    isLogin : false,
    message : ''
};

const Data = (state = initialStateData,action) => {

    if(action.type === LoginAction.USERDATA){
        if(action.payload.success) {
            return {
                ...state,
                isLogin: true,
                message: action.payload.message,
            }
        }else{
            return {
                ...state,
                message: action.payload.message,
            }
        }
    }

    if(action.type === LoginAction.LOGIN){
        if(action.payload.success) {
            let token = action.payload.data.auth_token;
            window.axios.defaults.headers.Authorization = 'Bearer ' + token;
            localStorage.setItem('token', token);
            return {
                ...state,
                isLogin: true,
                message: action.payload.message,
            }
        }else{
            return {
                ...state,
                message: action.payload.message,
            }
        }
    }

    if(action.type === LoginAction.LOGOUT){
        localStorage.removeItem('token');
        if(state.isLogin){
            return {
                ...state,
                isLogin: false,
                message: "Logout Successfully !!"
            }
        }else{
            return {
                message: "Logout Successfully !!"
            }
        }

    }
    return state;
};

export default Data;
