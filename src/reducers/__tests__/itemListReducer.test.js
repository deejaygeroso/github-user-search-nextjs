import { indexBy as __$indexBy } from "underscore";
import * as itemListReducer from "../itemListReducer";
import itemListTypes from "../../types/itemListTypes";

describe("itemListReducer", () => {
  const reducerStateName = "reducerList";
  const reducer = itemListReducer.itemInit(reducerStateName);
  const ACTION_TYPE = itemListTypes.init(reducerStateName);
  const byId = [ {id: '1', data: 'data1'}, { id: '2', data: 'data2'} ]; 
  const allIds = ['1', '2'];
  const state = { allIds, byId };

  it("returns default value", () => {
    expect(reducer(state, {})).toEqual(state);
  });
  
  it("set data list", () => {
    const list = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const action = {
      type: ACTION_TYPE.ITEM_LIST_SET,
      list
    };
    const byId = __$indexBy(list, "id");
    const allIds = Object.keys(byId);
    const result = Object.assign({}, { byId, allIds });
    expect(reducer(state, action)).toEqual(result);
  });
});
