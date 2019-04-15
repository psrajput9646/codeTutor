import AuthService from "../components/AuthService";

let auth = new AuthService();

export function user(state = null, action) {
    switch(action.type) {
        case 'GET_USER':
            return action.user;

        case 'SET_USER':
            return action.user

        default:
            return state;
    }
}

export function currentUser(state = null, action) {
    switch(action.type) {
        case 'GET_CURRENT_USER':
            return action.currentUser;

        case 'SET_CURRENT_USER':
            return action.currentUser

        default:
            return state;
    }
}

export function userLoading(state = false, action) {
    switch(action.type) {
        case 'USER_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function userErrored(state = null, action) {
    switch(action.type) {
        case 'USER_ERRORED':
            return action.error;

        default:
            return state;
    }
}

export function userLoggedIn(state = auth.isLoggedIn(), action) {
    switch(action.type) {
        case 'USER_SET_LOGIN':
            return action.status

        default:
            return state;
    }
}
