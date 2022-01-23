import { combineReducers } from "redux";
import blogState from "./blogState";
import imageRetrievalState from "./imageRetrievalState";

export default combineReducers({ blogState, imageRetrievalState });
