export const USERLIST = "USER_DATA";
export const USERDELETE = "USER_REMOVE";
export const CREATEUSER = "CREATE_USER";
export const RESETDATA = "RESETDATA";
export const USERVIEW = "USERVIEW";

export const userList = (data) => {
    let link;
    if(data === 1){
        link = 'users/list';
    }else{
        link = 'users/list'+data;
    }
    const request = axios.get(link);
    return dispatch =>
    {
        request.then(({ data,exportData }) => {
            dispatch({
                type: USERLIST,
                payload: data,exportData
            });
        });
    }
};


export const removeUser = (id) => {
    const request = axios.get('removeUser/'+id);
    return dispatch =>
    {
        request.then(({ data }) => {
            dispatch({
                type: USERDELETE,
                payload: data
            });
        });
    }
};

export const createUser = (data) => {
    const request = axios.post('create/user',data);
    return dispatch =>
    {
        request.then(({ data }) => {
            dispatch({
                type: CREATEUSER,
                payload: data
            });
        });
    }
};

export const getUserData = (data) => {
    let link = 'viewProfile?user_id='+data;
    const request = axios.get(link);
    return dispatch =>
    {
        request.then(({ data }) => {
            dispatch({
                type: USERVIEW,
                payload: data
            });
        });
    }
};

export const resetStateValue = () => {
    return dispatch =>
    {
        dispatch({
            type: RESETDATA,
        });
    }
};


