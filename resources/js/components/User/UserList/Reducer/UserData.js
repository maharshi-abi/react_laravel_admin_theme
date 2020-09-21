import * as UserAction from '../Container/UserController';

const initialStateData = {
    current_page : 1,
    per_page : 5,
    totalData : 0,
    userList : [],
    recordList : false,
};

const UserData = (state = initialStateData,action) => {

    if(action.type === UserAction.USERLIST){
        if(action.payload.success) {
            return {
                ...state,
                current_page : action.payload.data.current_page,
                per_page : action.payload.data.per_page,
                totalData : action.payload.data.total,
                userList: action.payload.data.data,
                exportData: action.payload.exportData,
                recordList: true,
            }
        }else{
            return {
                ...state,
                message: action.payload.message,
                status : 'alert alert-danger alert-dismissible show fade',
            }
        }
    }

    if(action.type === UserAction.USERDELETE){
        if(action.payload.success) {
            return {
                ...state,
                current_page : action.payload.data.current_page,
                per_page : action.payload.data.per_page,
                totalData : action.payload.data.total,
                userList: action.payload.data.data,
                exportData: action.payload.exportData,
                recordList: true,
            }
        }else{
            return {
                ...state,
                message: action.payload.message,
                status : 'alert alert-danger alert-dismissible show fade',
            }
        }
    }

    return state;
};

export default UserData;
