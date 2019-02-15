import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import Header from "./Header";
import Repositories from "./Repositories";
import Followers from "./Followers";
import Following from "./Following";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  jsonData: {
    textAlign: "left"
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  /* ----------------------------------------------------------------------------------
   * Json Data result. 
   * -------------------------------------------------------------------------------- */
  renderJsonData() {
    const { user, classes } = this.props;
    return (
      <TabContainer>
        <pre className={classes.jsonData}>{JSON.stringify(user, null, 2)}</pre>
      </TabContainer>
    );
  }

  /* ----------------------------------------------------------------------------------
   * Repository List. 
   * -------------------------------------------------------------------------------- */
  renderRepositories() {
    const { repositoryList } = this.props;
    return (
      <TabContainer>
        <Repositories repositoryList={repositoryList} />
      </TabContainer>
    );
  }

  /* ----------------------------------------------------------------------------------
   * Followers List. 
   * -------------------------------------------------------------------------------- */
  renderFollowers() {
    const { followerList } = this.props;
    return (
      <TabContainer>
        <Followers followerList={followerList} />
      </TabContainer>
    );
  }

  /* ----------------------------------------------------------------------------------
   * Following List. 
   * -------------------------------------------------------------------------------- */
  renderFollowing() {
    const { followingList } = this.props;
    return (
      <TabContainer>
        <Following followingList={followingList} />
      </TabContainer>
    );
  }

  /* ----------------------------------------------------------------------------------
   * Main Component. 
   * -------------------------------------------------------------------------------- */
  render() {
    const { classes, user } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Header user={user} />
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="JSON Data" />
            <Tab label="Repositories" />
            <Tab label="Followers" />
            <Tab label="Following" />
          </Tabs>
        </AppBar>
        {value === 0 && this.renderJsonData()}
        {value === 1 && this.renderRepositories()}
        {value === 2 && this.renderFollowers()}
        {value === 3 && this.renderFollowing()}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  user: PropTypes.object.isRequired,
  repositoryList: PropTypes.object.isRequired,
  followerList: PropTypes.object.isRequired,
  followingList: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
