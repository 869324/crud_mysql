import { LOGIN, LOGOUT, UPDATE_PROJECTS } from "./types";

export function login(user) {
  return {
    type: LOGIN,
    user: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function updateProjects(projects) {
  return {
    type: UPDATE_PROJECTS,
    projects: projects,
  };
}
