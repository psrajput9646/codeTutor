import AuthService from '../components/AuthService'
import { setProjects } from './projects'

export function userLoading(loading) {
  return {
    type: 'USER_LOADING',
    loading
  }
}

export function userErrored(error) {
  return {
    type: 'USER_ERRORED',
    error
  }
}

export function setUser(user) {
  return {
      type: 'SET_USER',
      user
  }
}

export function setCurrentUser(currentUser) {
  return {
      type: 'SET_CURRENT_USER',
      currentUser
  }
}

export function setUserLoggedIn(status) {
    return {
      type: 'USER_SET_LOGIN',
      status
    }
}

export function fetchCurrentUser() {
  return dispatch => {
    dispatch(userLoading(true))
    const authService = new AuthService()
    const user = authService.getProfile()
    authService.fetchAuth('/api/user/' + user.id)
    .then(user => {
        dispatch(userLoading(false));
        dispatch(setCurrentUser(user))
        dispatch(setProjects(user.projects))
    })
    .catch(err => {
        console.log(err)
        dispatch(userErrored(err))
        dispatch(userLoading(false))
    })
  }
}

export function fetchUser(userId) {
  return dispatch => {
    dispatch(userLoading(true))
    const authService = new AuthService()
    authService.fetchAuth('/api/user/' + userId)
    .then(user => {
        dispatch(userLoading(false));
        dispatch(setUser(user))
        dispatch(setProjects(user.projects))
    })
    .catch(err => {
        console.log(err)
        dispatch(userErrored(err))
        dispatch(userLoading(false))
    })
  }
}