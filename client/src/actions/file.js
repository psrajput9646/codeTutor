import AuthService from "../components/AuthService";

export function selectFile(file){
    return {
        type: 'SELECT_FILE',
        file
    }
}

export function fileSaving(saving){
    return {
        type: 'FILE_SAVING',
        saving
    }
}

export function fileErrored(error) {
    return {
        type: 'FILE_ERRORED',
        error
    }
}

export function saveFile(id, content){
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(fileSaving(true))
            dispatch(fileErrored(null))
            const auth = new AuthService();
            auth.fetchAuth('/api/file/save', {
                method: "POST",
                body: JSON.stringify({id, content})
            })
            .then(() => {
                dispatch(fileSaving(false))
                resolve()
            })
            .catch((error) => {
                console.log(error)
                dispatch(fileSaving(false))
                dispatch(fileErrored(error))
                reject()
            })

        })
    }
}