import AuthService from '../components/AuthService'

export function setProject(project){
  return {
      type: 'SELECT_PROJECT',
      project
  }
}

export function setProjects(projects) {
  return {
    type: 'SET_PROJECTS',
    projects
  }
}

export function addProject(project) {
  return {
    type: 'ADD_PROJECT',
    project: [project]
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

export function selectProject(projects, id) {
  return dispatch => {
      let found = projects.find(p => p.id === id);

      if(typeof found !== "undefined"){
        dispatch(setProject(found));
      }else{
        dispatch(setProject(null));
      }
  }
}

export function createProject(name, description) {
  return dispatch => {
    const authService = new AuthService();
    const uid = authService.getProfile().id;
    dispatch(projectsLoading(true))
    authService.fetchAuth('/api/project/create', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description
      })
    })
    .then(project => {
        dispatch(getProjects(uid))
        dispatch(projectsLoading(false))
    })
    .catch(err => {
        dispatch(projectsErrored(err))
        dispatch(projectsLoading(false))
    })
  }
}

export function getProjects(userId) {
  return dispatch => {
    const authService = new AuthService();
    dispatch(projectsLoading(true))
    authService.fetchAuth('/api/project/projects/' + userId, {
      method: 'GET'
    })
    .then(projects => {
      dispatch(setProjects(projects))
      dispatch(projectsLoading(false))
    })
    .catch(err => {
      dispatch(projectsLoading(false))
      dispatch(projectsErrored(err))
    })
  }
}

export function updateProject(id, name, description) {
  return dispatch => {
    dispatch(projectsLoading(true))
    const authService = new AuthService();
    
    authService.fetchAuth('/api/project/update', {
      method: 'POST',
      body: JSON.stringify({
        id,
        name,
        description
      })
    })
    .then(project => {
      dispatch(getProjects(authService.getProfile().id));
    })
    .catch(err => {
        dispatch(projectsErrored(err))
        dispatch(projectsLoading(false))
    })
  }
}