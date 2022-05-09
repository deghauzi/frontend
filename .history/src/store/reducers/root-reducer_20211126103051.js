import { combineReducers } from "redux";
import auth from "./Auth";
import Settings from "./Settings";
import { reducer as formReducer } from "redux-form";
import common from "./Common";
import toggleDashboard from "./ToggleDashboard";
import projects from "./Projects";
import contributions from "./Contribution";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { LOGOUT } from "store/actions/ActionTypes";



const appReducer = combineReducers({
  form: formReducer,
  authReducer: auth,
  commonReducer: common,
  settings: Settings,
  dashboardReducer: toggleDashboard,
  contributionReducer: contributions,
  projectsReducer: projects

});

const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
