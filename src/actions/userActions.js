import axios from "axios";
import { USER_SET, USER_LIST_SET, USER_REQUEST_STATUS } from '../types/userActionTypes'; 
import * as itemListActions from "./itemListActions";

/* ----------------------------------------------------------------------------------
 * Used for showing loading indicator.
 * -------------------------------------------------------------------------------- */
export const userIsFetching = value => ({
  type: USER_REQUEST_STATUS,
  isFetching: value
});

/* ----------------------------------------------------------------------------------
 * Set a single user.
 * -------------------------------------------------------------------------------- */
export const userSet = ({ user }) => ({
  type: USER_SET,
  user
});

/* ----------------------------------------------------------------------------------
 * Set a list of users.
 * -------------------------------------------------------------------------------- */
export const userListSet = ({ result, page }) => ({
  type: USER_LIST_SET,
  result,
  page
});

/* ----------------------------------------------------------------------------------
 * Find list of users.
 * -------------------------------------------------------------------------------- */
export const apiGithubSearchUsers = ({ username, page = 1, per_page = 20 }) => {
  return async dispatch => {
    dispatch(userIsFetching(true));
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${username}+in:login&page=${page}&per_page=${per_page}`
      );
      dispatch(userListSet({ result: res && res.data, page }));
      dispatch(userIsFetching(false));
    } catch (error) {
      // error handling here
      dispatch(userIsFetching(false));
    }
  };
};

/* ----------------------------------------------------------------------------------
 * Find additional info of user which is list of repositories, followers and following
 * -------------------------------------------------------------------------------- */
export const apiGithubUserAdditionalInfo = ({ username }) => {
  return async dispatch => {
    dispatch(userIsFetching(true));
    try {
      const resRepositories = await axios.get(
        `https://api.github.com/search/repositories?q=user:${username}`
      );
      const resFollowers = await axios.get(
        `https://api.github.com/users/${username}/followers`
      );
      const resFollowing = await axios.get(
        `https://api.github.com/users/${username}/following`
      );
      dispatch(
        itemListActions.set({
          reducerStateName: "repositoryList",
          list: resRepositories.data.items
        })
      );
      dispatch(
        itemListActions.set({
          reducerStateName: "followerList",
          list: resFollowers.data
        })
      );
      dispatch(
        itemListActions.set({
          reducerStateName: "followingList",
          list: resFollowing.data
        })
      );
    } catch (error) {
      // error handling here
    }
  };
};
