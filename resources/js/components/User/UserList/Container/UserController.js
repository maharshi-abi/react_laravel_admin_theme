export const USERLIST = "USER_DATA";

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
        request.then(({ data }) => {
            dispatch({
                type: USERLIST,
                payload: data
            });
        });
    }
};
