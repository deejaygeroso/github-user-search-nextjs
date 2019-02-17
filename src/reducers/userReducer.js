import { indexBy as __$indexBy } from "underscore";
import { USER_SET, USER_LIST_SET, USER_LIST_PATCH, USER_REQUEST_STATUS } from '../types/userActionTypes';

/* ----------------------------------------------------------------------------------
 *  Used for viewing more information of selected user from search result.
 * -------------------------------------------------------------------------------- */
const initialUser = {};
export const user = (state = initialUser, { type, user }) => {
  switch (type) {
    case USER_SET: {
      return Object.assign({}, user);
    }
    default: {
      return state;
    }
  }
};

const initialUserList = {
    allIds: [], 
    byId: {},
    page: 1,
    total_count: 0,
};
/* ----------------------------------------------------------------------------------
 * List of users reducer based from search results. 
 * -------------------------------------------------------------------------------- */
export const userList = (state = initialUserList, { type, result, page=1, user }) => {
  switch (type) {
    case USER_LIST_SET: {
      const { items, total_count } = result;
      const byId = __$indexBy(items, "id");
      const allIds = Object.keys(byId);
      return Object.assign({}, { byId, allIds, page, total_count });
    }
    case USER_LIST_PATCH: {
      const { byId } = state;
      if(byId && byId[user.id]){
        byId[user.id] = Object.assign(byId[user.id], user);
      }
      return Object.assign({}, state, { byId });
    }
    default: {
      return state;
    }
  }
};

/* ----------------------------------------------------------------------------------
 * Request status reducer mainly used for showing loadingscreen while fetching data. 
 * -------------------------------------------------------------------------------- */
const initialUserRequestStatus = { isFetching: false };
export const userRequestStatus = (state = initialUserRequestStatus, {type, isFetching}) => {
    switch(type){
        case USER_REQUEST_STATUS: {
            return Object.assign({}, {isFetching});
        }
        default: {
            return state;
        }
    }
}
