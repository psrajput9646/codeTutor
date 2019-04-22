export function selectedProject(state = null, action){
  switch (action.type) {
      case 'SELECT_PROJECT':
          return action.project

      default:
          return state
  }
}

export function projects(state = [], action) {
  switch (action.type) {
    case 'GET_PROJECTS':
      return action.projects

    case 'SET_PROJECTS':
      return action.projects

    case 'ADD_PROJECT':
      return action.project.concat(state)

    default:
      return state
  }
}

export function projectsLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTS_LOADING':
      return action.loading

    default:
      return state
  }
}

export function projectsErrored(state = null, action) {
  switch (action.type) {
    case 'PROJECTS_ERRORED':
      return action.error

    default:
      return state
  }
}
