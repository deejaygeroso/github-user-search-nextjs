import * as userActions from "../userActions";
import {
  USER_SET,
  USER_LIST_SET,
  USER_LIST_PATCH,
  USER_REQUEST_STATUS
} from "../../types/userActionTypes";

describe("userActions - ACTION CREATOR", () => {
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
  })
});
