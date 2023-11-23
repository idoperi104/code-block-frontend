import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux"
import { codeblockReducer } from "./reducers/codeblock.reducer"
import { userReducer } from "./reducers/user.reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  codeblockModule: codeblockReducer,
  userModule: userReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)