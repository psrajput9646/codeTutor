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