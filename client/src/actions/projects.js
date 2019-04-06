import AuthService from '../components/AuthService'

export function setProjects(projects) {
  return {
    type: 'SET_PROJECTS',
    projects
  }
}

export function addProject(project) {
  return {
    type: 'ADD_PROJECT',
    project
  }
}

export function projectsLoading(loading) {
  return {
    type: 'PROJECTS_LOADING',
    loading
  }
}

export function projectsErrored(error) {
  return {
    type: 'PROJECTS_ERRORED',
    error
  }
}

export function createProject(project) {
  return dispatch => {
    const authService = new AuthService();
    dispatch(projectsLoading(true))
    authService.fetchAuth('/api/project/create', {
      method: 'POST',
      body: JSON.stringify(project)
    })
    .then(project => {
        dispatch(addProject(project))
        dispatch(projectsLoading(false))
    })
    .catch(err => {
        dispatch(projectsLoading(false))
        dispatch(projectsErrored(err))
    })
  }
}
