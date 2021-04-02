import isLogged from './isLogged';
//import otherReducer from './otherReducer';
import {combineReducers} from "redux"; 

const allReducers = combineReducers({
    isLogged: isLogged,
})

export default allReducers;