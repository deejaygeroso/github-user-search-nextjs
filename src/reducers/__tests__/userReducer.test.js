import { indexBy as __$indexBy } from "underscore";
import * as userReducer from "../userReducer";
import {
  USER_SET,
  USER_LIST_SET,
  USER_LIST_PATCH,
  USER_REQUEST_STATUS
} from "../../types/userActionTypes";

describe("user - Reducer", () => {
  const state = {};

  it("returns default value", () => {
    expect(userReducer.user(state, {})).toEqual(state);
  });

  it("set data list", () => {
    const user = { id: 1, name: "name" };
    const action = {
      type: USER_SET,
      user
    };
    expect(userReducer.user(state, action)).toEqual(user);
  });
});

describe("userList - Reducer", () => {
  const state = {
    allIds: [],
    byId: {},
    page: 1,
    total_count: 0
  };

  it("returns default value", () => {
    expect(userReducer.userList(state, {})).toEqual(state);
  });

  it("set data list", () => {
    const items = [{ id: 1, name: "name" }, { id: 2, name: "name" }];
    const total_count = 2;
    const result = {
      items,
      total_count
    };
    const page = 1;
    const action = {
      type: USER_LIST_SET,
      result,
      page
    };
    const byId = __$indexBy(items, "id");
    const allIds = Object.keys(byId);
    const expectedValue = Object.assign({}, { byId, allIds, page, total_count });

    expect(userReducer.userList(state, action)).toEqual(expectedValue);
  });

  it("patches a single data from the list", ()=>{
    const currentState = {
      allIds: [1,2],
      byId: {
        1: {id: 1, name: '1'},
        2: {id: 1, name: '2'}
      },
      page: 1,
      total_count: 2
    };
    const user = {id: 1, name: "new name"}
    const action = {
      type: USER_LIST_PATCH,
      user,
    };
    const { byId } = currentState;
    byId[user.id] = Object.assign(byId[user.id], user);
    const expectedValue = Object.assign({}, currentState, { byId });
    expect(userReducer.userList(currentState, action)).toEqual(expectedValue);
  })
});

describe("userRequestStatus - Reducer", () =>{
    const state = { isFetching: false };
  it("returns default value", () => {
    expect(userReducer.userRequestStatus(state, {})).toEqual(state);
  });

  it("sets user status", ()=>{
      const isFetching = true;
      const action = {
          type: USER_REQUEST_STATUS,
          isFetching,
      }
      expect(userReducer.userRequestStatus(state, action)).toEqual({isFetching})
  })
})
