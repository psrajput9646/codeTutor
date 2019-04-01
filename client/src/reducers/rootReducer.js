import { combineReducers } from 'redux'
import { projects, projectsErrored, projectsLoading } from './projects'
import { user, userErrored, userLoading } from './user'
import { fileCache, fileCacheErrored, fileCacheLoading } from './fileCache'
import { selectedFile } from './file'

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
  selectedFile
})
