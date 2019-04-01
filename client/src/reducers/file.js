export function selectedFile(state = null, action){
    switch (action.type) {
        case 'SELECT_FILE':
            return action.file

        default:
            return state
    }
}