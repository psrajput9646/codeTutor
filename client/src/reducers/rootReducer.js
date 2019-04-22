import { combineReducers } from 'redux'
import { projects, selectedProject, projectsErrored, projectsLoading } from './projects'
import { user, currentUserId, userErrored, userLoading, userLoggedIn } from './user'
import { fileCache, fileCacheErrored, fileCacheLoading } from './fileCache'
import { selectedFile, fileErrored, fileSaving } from './file'
import { socket } from './socket'

export default combineReducers({
  projects,
  selectedProject,
  projectsErrored,
  projectsLoading,
  user,
  userErrored,
  userLoading,
  currentUserId,
  fileCache,
  fileCacheErrored,
  fileCacheLoading,
  selectedFile,
  fileErrored,
  fileSaving,
  userLoggedIn,
  socket
})
