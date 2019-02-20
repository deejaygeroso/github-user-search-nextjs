import * as userActions from "../userActions";
import {
  USER_SET,
  USER_LIST_SET,
  USER_LIST_PATCH,
  USER_REQUEST_STATUS
} from "../../types/userActionTypes";
import { PER_PAGE_LIMIT } from '../../config';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("userActions - ACTION CREATOR", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("userIsFetching", () => {
    const value = true;
    const expectedAction = {
      type: USER_REQUEST_STATUS,
      isFetching: value
    };
    expect(userActions.userIsFetching(value)).toEqual(expectedAction);
  });
  it("userSet", () => {
    const user = { login: 'loginname' };
    const expectedAction = {
      type: USER_SET,
      user
    };
    expect(userActions.userSet({user})).toEqual(expectedAction);
  });
  it("userListSet", () => {
    const result = {
        items :[{ login: 'loginname' }, {loginname: 'secondname'}]
    } ;
    const page = 1;
    const expectedAction = {
      type: USER_LIST_SET,
      result,
      page
    };
    expect(userActions.userListSet({result, page})).toEqual(expectedAction);
  });
  it('userListPatch', ()=>{
    const user = {};
    const expectedAction = {
      type: USER_LIST_PATCH,
      user
    }
    expect(userActions.userListPatch({user})).toEqual(expectedAction);
  });
  it('apiGithubSearchUsers - fetch github user by username', ()=>{
    const data = [
      {
        id: 1,
        login: 'username 1',
      },
      {
        id: 2,
        login: 'username 2',
      }
    ]
    const page = 1;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: data,
      });
    });
    const expectedActions = [
      { type: USER_REQUEST_STATUS, isFetching: true },
      // { type: USER_REQUEST_STATUS, isFetching: false },
      // { type: USER_LIST_SET, result: data, page: 1 },
    ];
    const store = mockStore({ userList: {} })
    const username = 'username';
    return store.dispatch(userActions.apiGithubSearchUsers({ username, page, per_page: PER_PAGE_LIMIT })).then(() => {
      // return of async actions
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions.map(action=>action.type));
    });
  })
});
