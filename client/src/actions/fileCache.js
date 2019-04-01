import AuthService from '../components/AuthService'

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

export function fetchFile(file) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const authService = new AuthService()
      dispatch(fileCacheErrored(null))
      dispatch(fileCacheLoading(true))
      authService
        .fetchAuth('api/file/' + file.id)
        .then(fetchedFile => {
          dispatch(addFile(fetchedFile))
          dispatch(fileCacheLoading(false))
          resolve(fetchedFile)
        })
        .catch(err => {
          dispatch(fileCacheLoading(false))
          dispatch(fileCacheErrored(err))
          reject(err)
        })
    })
  }
}
