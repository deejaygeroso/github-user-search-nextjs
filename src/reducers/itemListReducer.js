import { indexBy as __$indexBy } from "underscore";
import itemListTypes from "../types/itemListTypes";

const initialItemList = { allIds: [], byId: {} };

/* ----------------------------------------------------------------------------------
 * Reusable reducer used for  repositoryList, followerList and followingList
 * -------------------------------------------------------------------------------- */
export function itemInit(reducerStateName) {
  const ACTION_TYPE = itemListTypes.init(reducerStateName);
  return function(state = initialItemList, { type, list }) {
    switch (type) {
      case ACTION_TYPE.ITEM_LIST_SET: {
        const byId = __$indexBy(list, "id");
        const allIds = Object.keys(byId);
        return Object.assign({}, { byId, allIds });
      }
      default: {
        return state;
      }
    }
  };
}
