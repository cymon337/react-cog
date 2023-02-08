import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import mypageReducer from "./MypageModule";

const rootReducer = combineReducers({
    memberReducer,
    mypageReducer
});

export default rootReducer;