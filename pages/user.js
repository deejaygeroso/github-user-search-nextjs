/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserPage from "../src/modules/user/containers/UserPage";

const styles = {};

class Index extends React.Component {
  render() {
    return <UserPage />;
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
