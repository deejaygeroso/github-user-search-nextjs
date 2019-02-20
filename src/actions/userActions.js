import axios from "axios";
import {
  USER_SET,
  USER_LIST_SET,
  USER_LIST_PATCH,
  USER_REQUEST_STATUS
} from "../types/userActionTypes";
import * as itemListActions from "./itemListActions";
import { PER_PAGE_LIMIT } from '../config';

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
 * Patch List of User 
 * -------------------------------------------------------------------------------- */
export const userListPatch = ({user}) => ({
  type: USER_LIST_PATCH,
  user
})

/* ----------------------------------------------------------------------------------
 * Find list of users.
 * -------------------------------------------------------------------------------- */
export const apiGithubSearchUsers = ({ username, page = 1, per_page = PER_PAGE_LIMIT }) => {
  return async dispatch => {
    dispatch(userIsFetching(true));
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${username}+in:login&page=${page}&per_page=${per_page}`);
      // dispatch(userListSet({ result: res && res.data, page }));
      dispatch(userIsFetching(false));

      // asynchronous-ly patch user info to have access on number of followers and following per user
      res.data.items.map((resUser)=>{
        axios.get(`https://api.github.com/users/${resUser.login}`).then((userInfo)=>{
            dispatch(userListPatch({user: userInfo.data}))
          });
        })
        
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
  return dispatch => {
    try {
      axios.get(`https://api.github.com/users/${username}`).then((res)=>{
        dispatch(userSet({ user: res.data }));
      });
      axios.get(`https://api.github.com/search/repositories?q=user:${username}`).then(res=>{
        dispatch(
          itemListActions.set({
            reducerStateName: "repositoryList",
            list: res.data.items
          })
        );
      });
      axios.get(`https://api.github.com/users/${username}/followers`).then(res=>{
        dispatch(
          itemListActions.set({
            reducerStateName: "followerList",
            list: res.data
          })
        );
      });
      axios.get(`https://api.github.com/users/${username}/following`).then(res=>{
        dispatch(
          itemListActions.set({
            reducerStateName: "followingList",
            list: res.data
          })
        );
      });
    } catch (error) {
      // error handling here
    }
  };
};
