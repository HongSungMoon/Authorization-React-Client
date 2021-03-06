import { LOGIN, LOGOUT, AUTHORIZE, USERLIST } from '../actions';
import { combineReducers } from 'redux';

const serviceInitialState = {
    islogin: 0,
    userInfo: {
        access_token: null,
        id: null,
        name: null,
        email: null,
        user_type: null
    },
    userList: null
};

const service = (state = serviceInitialState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                islogin: 1
            });
        case LOGOUT:
            return Object.assign({}, state, {
                islogin: 0,
                userInfo: {
                    access_token: null,
                    id: null,
                    name: null,
                    email: null,
                    user_type: null
                }
            });
            case AUTHORIZE:
            return Object.assign({}, state, {
                islogin: 1,
                userInfo: action.userInfo
            });
            case USERLIST:
            return Object.assign({}, state, {
                islogin: 1,
                userList: action.userList
            });
        default:
            return state;
    }
};


const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const serviceApp = combineReducers({
    service
});

export default serviceApp;