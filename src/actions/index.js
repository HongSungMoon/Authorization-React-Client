export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHORIZE = 'SAVEUSERINFO';
export const USERLIST = 'USERLIST';



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

export function getUserList(userList) {
    return {
        type: USERLIST,
        userList
    };
}