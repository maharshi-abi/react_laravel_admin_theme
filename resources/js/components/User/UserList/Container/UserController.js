export const USERLIST = "USER_DATA";
export const USERDELETE = "USER_REMOVE";

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
