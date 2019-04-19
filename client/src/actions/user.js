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

export function setUserBio(bio) {
  return {
      type: 'SET_USER_BIO',
      bio
  }
}

export function setUserLoggedIn(status) {
    return {
      type: 'USER_SET_LOGIN',
      status
    }
}

export function setCurrentUserId() {
  return {
    type: 'USER_SET_ID',
    userId: (new AuthService()).getProfile().id
  }
}

export function fetchUser(userId) {
  return dispatch => {
    dispatch(userLoading(true))
    const authService = new AuthService()
    authService.fetchAuth('/api/user/' + userId)
    .then(user => {
        dispatch(setUser(user))
        dispatch(setProjects(user.projects))
        dispatch(userLoading(false));
    })
    .catch(err => {
        dispatch(userErrored(err))
        dispatch(userLoading(false))
    })
  }
}

export function updateUser(bio) {
  return dispatch => {
    //dispatch(userLoading(true))
    const authService = new AuthService()

    authService.fetchAuth('/api/user/update', {
      method: 'POST',
      body: JSON.stringify({
        bio
      })
    })
    .then(user => {
      dispatch(setUser(user))
      dispatch(userLoading(false))
    })
    .catch(err => {
      dispatch(userErrored(err))
      dispatch(userLoading(false))
    })
  }
}