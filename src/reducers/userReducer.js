import { indexBy as __$indexBy } from "underscore";
import { USER_SET, USER_LIST_SET, USER_LIST_PATCH, USER_REQUEST_STATUS } from '../types/userActionTypes';

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
      byId[user.id] = Object.assign(byId[user.id], user);
      return Object.assign({}, state, { byId });
    }
    default: {
      return state;
    }
  }
};

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
