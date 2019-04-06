export function fileCache(state = [], action) {
  switch (action.type) {
    case 'FILE_CACHE_ADD':
      return state.concat(action.file)

    default:
      return state
  }
}

export function fileCacheLoading(state = false, action) {
  switch (action.type) {
    case 'FILE_CACHE_LOADING':
      return action.loading

    default:
      return state
  }
}

export function fileCacheErrored(state = null, action) {
  switch (action.type) {
    case 'FILE_CACHE_ERRORED':
      return action.error

    default:
      return state
  }
}
