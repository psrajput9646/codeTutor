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

export function setFavoritedProjects(favoritedProjects) {
  return {
    type: 'SET_FAVORITED',
    favoritedProjects
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
        dispatch(fetchFavoritedProjects(user.favoritedProjects))
    })
    .catch(err => {
        dispatch(userErrored(err))
        dispatch(userLoading(false))
    })
  }
}

export function fetchFavoritedProjects(favoritedProjects) {
  return dispatch => {
    const authService = new AuthService()
    authService.fetchAuth('/api/project/get/favorited/',{
      method: "POST",
      body: JSON.stringify({
        favoritedProjects
      })
    })
    .then(projects => {
        dispatch(setFavoritedProjects(projects))
        dispatch(userLoading(false));
    })
    .catch(err => {
        dispatch(userErrored(err))
        dispatch(userLoading(false))
    })
  }
}

export function updateUser(data, fields) {
  return dispatch => {
    //dispatch(userLoading(true))
    const authService = new AuthService()

    authService.fetchAuth('/api/user/update', {
      method: 'POST',
      body: JSON.stringify({
        bio: data.bio,
        firstName: data.firstName,
        lastName: data.lastName,
        favoritedProjects: data.favoritedProjects,
        fields
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