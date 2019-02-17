import itemListTypes from "../types/itemListTypes";

/* ----------------------------------------------------------------------------------
 * Set a list of data.
 * -------------------------------------------------------------------------------- */
export const set = ({ reducerStateName, list }) => {
  const ACTION_TYPE = itemListTypes.init(reducerStateName);
  return {
    type: ACTION_TYPE.ITEM_LIST_SET,
    list
  };
};
