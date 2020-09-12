export const LOGIN = "LOGIN";
export const USERDATA = "USER_DATA";
export const LOGOUT = "LOGOUT";

export const checkAuthentication = (data) => {
    const request = axios.get('profile',data);
    return dispatch =>
    {
        request.then(({ data }) => {
            dispatch({
                type: USERDATA,
                payload: data
            });
        });
    }
};

export const submitData = (data) => {
    const request = axios.post('login',data);
    return dispatch =>
    {
        request.then(({ data }) => {
            localStorage.setItem('token', data.auth_token);
            dispatch({
                type: LOGIN,
                payload: data
            });
        });
    }
};

export const logout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT
        });
    }
};
