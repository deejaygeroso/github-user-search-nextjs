/* ----------------------------------------------------------------------------------
 * These are just action types. 
 * -------------------------------------------------------------------------------- */
const itemListTypes = {
  init: REDUCER_STATE_NAME => {
    return {
      ITEM_LIST_SET: `${REDUCER_STATE_NAME.toUpperCase()}_LIST_SET`
    };
  }
};

export default itemListTypes;
