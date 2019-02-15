import * as itemListActions from "../itemListActions";
import itemListTypes from "../../types/itemListTypes";

describe("itemListActions - ACTION CREATORS", () => {
  const reducerStateName = "reducerStateName";
  const list = [{ name: "name1" }, { name: "name2" }, { name: "name3" }];
  const ACTION_TYPE = itemListTypes.init(reducerStateName);
  it("set", () => {
    const expectedAction = {
      type: ACTION_TYPE.ITEM_LIST_SET,
      list
    };
    expect(itemListActions.set({ reducerStateName, list })).toEqual(
      expectedAction
    );
  });
});
