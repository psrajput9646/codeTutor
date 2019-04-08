import io from "socket.io-client";

export function socket(state = io(), action) {
    switch(action.type) {
        default:
            return state;
    }
}