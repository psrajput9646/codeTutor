import { combineReducers } from 'redux'
import { projects, projectsErrored, projectsLoading } from './projects'
import { user, currentUser, userErrored, userLoading, userLoggedIn } from './user'
import { fileCache, fileCacheErrored, fileCacheLoading } from './fileCache'
import { selectedFile, fileErrored, fileSaving } from './file'
import { socket } from './socket'

export default combineReducers({
  projects,
  projectsErrored,
  projectsLoading,
  user,
  currentUser,
  userErrored,
  userLoading,
  fileCache,
  fileCacheErrored,
  fileCacheLoading,
  selectedFile,
  fileErrored,
  fileSaving,
  userLoggedIn,
  socket
})
