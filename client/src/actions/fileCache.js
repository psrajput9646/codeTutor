import AuthService from '../components/AuthService'
import { saveFile } from "./file"

export function fileCacheLoading(loading) {
  return {
    type: 'FILE_CACHE_LOADING',
    loading
  }
}

export function fileCacheErrored(error) {
  return {
    type: 'FILE_CACHE_ERRORED',
    error 
  }
}

export function addFile(file) {
  return {
    type: 'FILE_CACHE_ADD',
    file
  }
}

export function updateFileCache(id, content) {
  return {
    type: 'FILE_CACHE_UPDATE',
    id,
    content
  }
}

export function updateAndSave(id, content) {
  return dispatch => {
    dispatch(updateFileCache(id, content))
    dispatch(saveFile(id, content))
  }
}

export function fetchFile(file) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const authService = new AuthService()
      dispatch(fileCacheErrored(null))
      dispatch(fileCacheLoading(true))
      authService
        .fetchAuth('/api/file/' + file.id)
        .then(fetchedFile => {
          dispatch(addFile(fetchedFile))
          dispatch(fileCacheLoading(false))
          resolve(fetchedFile)
        })
        .catch(err => {
          dispatch(fileCacheLoading(false))
          dispatch(fileCacheErrored("failed to retrieve file"))
          reject(err)
        })
    })
  }
}
