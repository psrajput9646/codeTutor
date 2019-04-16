export function selectedFile(state = null, action){
    switch (action.type) {
        case 'SELECT_FILE':
            return action.file

        default:
            return state
    }
}

export function fileSaving(state = false, action) {
    switch (action.type) {
        case 'FILE_SAVING':
            return action.saving

        default:
            return state
    }
}

export function fileErrored(state = null, action) {
    switch (action.type) {
        case 'FILE_ERRORED':
            return action.error

        default:
            return state
    }
}