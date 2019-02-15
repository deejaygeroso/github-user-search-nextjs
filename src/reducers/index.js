import { combineReducers } from "redux";
import { user, userList, userRequestStatus } from "./userReducer";
import * as itemListReducer from './itemListReducer';

export default combineReducers({
  user,
  userList,
  userRequestStatus,

  repositoryList : itemListReducer.itemInit('repositoryList'),
  followerList   : itemListReducer.itemInit('followerList'),
  followingList  : itemListReducer.itemInit('followingList'),
});
