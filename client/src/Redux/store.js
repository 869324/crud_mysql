import { createStore, combineReducers } from "redux";

import { userReducer, projectsReducer } from "./reducers";

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
});
const store = createStore(rootReducer);
export default store;
