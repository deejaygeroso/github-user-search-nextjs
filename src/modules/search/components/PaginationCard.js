import React from "react";
import PropTypes from "prop-types";
import Pagination from "material-ui-flat-pagination";

// const theme = createMuiTheme();
import { PER_PAGE_LIMIT } from '../../../config';

const PaginationCard = ({ total, offset, onClick, isHidden }) => {
  // hide if loading is showing
  if(isHidden){
    return <div/>
  }
  // do not show pagination
  if (total <= PER_PAGE_LIMIT) {
    return <div />;
  }
  return (
      <Pagination
        limit={PER_PAGE_LIMIT}
        offset={offset}
        total={total}
        onClick={(e, offset) => {
          let page = (offset / PER_PAGE_LIMIT) + 1;
          onClick(page);
        }}
      />
  );
};

PaginationCard.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PaginationCard;
