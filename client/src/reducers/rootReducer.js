import { combineReducers } from 'redux'
import { projects, projectsErrored, projectsLoading } from './projects'
import { user, userErrored, userLoading, userLoggedIn } from './user'
import { fileCache, fileCacheErrored, fileCacheLoading } from './fileCache'
import { selectedFile } from './file'
import { socket } from './socket'

export default combineReducers({
  projects,
  projectsErrored,
  projectsLoading,
  user,
  userErrored,
  userLoading,
  fileCache,
  fileCacheErrored,
  fileCacheLoading,
  selectedFile,
  userLoggedIn,
  socket
})
