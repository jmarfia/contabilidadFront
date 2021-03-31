import loggedReducer from './isLogged';
//import otherReducer from './otherReducer';
import {combineReducers} from "redux"; 

const allReducers = combineReducers({
    loggedReducer: loggedReducer,
})

export default allReducers;