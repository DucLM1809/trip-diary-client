import rootReducer from "./reducer";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools();

const store = createStore(rootReducer, composeEnhancers);

export default store
