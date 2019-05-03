import { produce } from 'immer'

export const fileCache = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'FILE_CACHE_ADD':
        draft[action.file.id] = action.file;
        break;
        
      case 'FILE_CACHE_UPDATE':
        draft[action.id].content = action.content
        break;
      
      default:
        return state
    }
  })

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