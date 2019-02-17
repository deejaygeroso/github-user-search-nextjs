import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();
const PER_PAGE_LIMIT = 8;

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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pagination
        limit={20}
        offset={offset}
        total={total}
        onClick={(e, offset) => {
          let page = offset / PER_PAGE_LIMIT + 1;
          onClick(page);
        }}
      />
    </MuiThemeProvider>
  );
};

PaginationCard.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PaginationCard;
