import * as userActions from "../userActions";
import {
  USER_SET,
  USER_LIST_SET,
  USER_LIST_PATCH,
  USER_REQUEST_STATUS
} from "../../types/userActionTypes";
import { PER_PAGE_LIMIT } from '../../config';
import itemListTypes from "../../types/itemListTypes";

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
  /* ----------------------------------------------------------------------------------
   * TODO: not tested -> asynchronous-ly patch user info to have access on 
   * number of followers and following per user
   * -------------------------------------------------------------------------------- */
  describe('apiGithubSearchUsers', ()=>{
    it('successfully fetch github user by username. ', ()=>{
      const data = [ { id: 1, login: 'username 1' }, { id: 2, login: 'username 2' } ];
      const page = 1;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            incomplete_results: false,
            items: data,
            total_count: 1,
          },
        });
      });
      const expectedActionsInSequence = [
        { type: USER_REQUEST_STATUS, isFetching: true },
        { type: USER_LIST_SET, result: data, page: 1 },
        { type: USER_REQUEST_STATUS, isFetching: false },
      ];
      const store = mockStore({ userList: {} })
      const username = 'username';
      // Expected actions to be dispatched
      return store.dispatch(userActions.apiGithubSearchUsers({ username, page, per_page: PER_PAGE_LIMIT })).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActionsInSequence.map(action=>action.type));
      });
    })
  })

  describe('apiGithubSearchUsers', ()=>{
    it('successfully find additional user info with repository, followers and following list data', async ()=>{

      const user = {id: 1, login: 'username' };
      const repositoryList = [{id: 1}, {id: 2}];
      const followerList   = [{id: 1}, {id: 2}];
      const followingList  = [{id: 1}, {id: 2}];

      moxios.wait(() => {
        // user api call
        const userRequest = moxios.requests.mostRecent();
        userRequest.respondWith({
          status: 200,
          response: user
        }).then(()=>{
          // repositoryList api call
          const repositoryRequest = moxios.requests.mostRecent();
          repositoryRequest.respondWith({
              status: 200,
              response: { items: repositoryList }
          }).then(()=>{
            // followersList api call
            const followerRequest = moxios.requests.mostRecent();
            followerRequest.respondWith({
                status: 200,
                response: followerList
            }).then(()=>{
              // folowingList api call
              const followingRequest = moxios.requests.mostRecent();
              followingRequest.respondWith({
                  status: 200,
                  response: followingList
              });
            });
          });
        });
      })

      // get all repository action type that will be used for dispatching actions
      const REPOSITORY_TYPE = itemListTypes.init('repositoryList');
      const FOLLOWER_TYPE   = itemListTypes.init('followerList');
      const FOLLOWING_TYPE  = itemListTypes.init('followingList');

      // must be in sequence when for checking dispatched actions
      const expectedActionsInSequence = [
        { type: USER_SET, user },
        { type: REPOSITORY_TYPE.ITEM_LIST_SET, list: repositoryList },
        { type: FOLLOWER_TYPE.ITEM_LIST_SET,   list: followerList },
        { type: FOLLOWING_TYPE.ITEM_LIST_SET,  list: followingList }
      ];

      const store = mockStore({ userList: {} })
      const username = 'username';

      // expect all actions will have dispatched all expectedActionsInSequence object
      return store.dispatch(userActions.apiGithubUserAdditionalInfo({ username })).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActionsInSequence);
      });
  
    });
  })

});
