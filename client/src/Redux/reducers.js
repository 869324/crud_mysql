import { LOGIN, LOGOUT, UPDATE_PROJECTS } from "./types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PROJECTS: {
      console.log(action.projects);
      return action.projects;
    }
    default:
      return state;
  }
};
