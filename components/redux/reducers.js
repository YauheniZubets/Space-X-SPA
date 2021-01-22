import { combineReducers } from 'redux';

import userReducer from "./userReducer";

let combinedReducer=combineReducers({
    // редьюсер countersReducer отвечает за раздел state под именем counters
    userInfo: userReducer, 
    // + другие редьюсеры
});

export default combinedReducer;
