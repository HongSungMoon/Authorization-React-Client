import { LOGIN, LOGOUT } from '../actions';
import { combineReducers } from 'redux';

const counterInitialState = {
    value: 0,
    diff: 1
};

const counter = (state = counterInitialState, action) => {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                value: 1
            });
        case LOGOUT:
            return Object.assign({}, state, {
                value: 0
            });
        default:
            return state;
    }
};


const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

const counterApp = combineReducers({
    counter,
    extra
});

export default counterApp;