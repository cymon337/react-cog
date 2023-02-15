import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import mypageReducer from "./MypageModule";
import galleryReducer from "./GalleryModule";

const rootReducer = combineReducers({
    memberReducer,
    mypageReducer,
    galleryReducer
});

export default rootReducer;