export const isLogin = () => {
    return !!localStorage.getItem('token');
};