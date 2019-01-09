export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHORIZE = 'SAVEUSERINFO';



export function login() {
    return {
        type: LOGIN
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

export function authorize(userInfo) {
    return {
        type: AUTHORIZE,
        userInfo
    };
}