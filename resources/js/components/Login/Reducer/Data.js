import * as LoginAction from '../Container/LoginController';

const initialStateData = {
    username : 'Admin',
    isLogin : false,
    message : '',
    status : 'alert alert-danger alert-dismissible show fade',
};

const Data = (state = initialStateData,action) => {

    if(action.type === LoginAction.USERDATA){
        if(action.payload.success) {
            return {
                ...state,
                username : action.payload.data.name,
                isLogin: true,
                message: action.payload.message,
                status : 'alert alert-success alert-dismissible show fade',
            }
        }else{
            return {
                ...state,
                message: action.payload.message,
                status : 'alert alert-danger alert-dismissible show fade',
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
                status : 'success',
            }
        }else{
            return {
                ...state,
                message: action.payload.message,
                status : 'alert alert-danger alert-dismissible show fade',
            }
        }
    }

    if(action.type === LoginAction.LOGOUT){
        localStorage.removeItem('token');
        if(state.isLogin){
            return {
                ...state,
                isLogin: false,
                message: "Logout Successfully !!",
                status : 'alert alert-success alert-dismissible show fade',
            }
        }else{
            return {
                ...state,
                message: "Logout Successfully !!",
                status : 'alert alert-success alert-dismissible show fade',
            }
        }

    }
    return state;
};

export default Data;
