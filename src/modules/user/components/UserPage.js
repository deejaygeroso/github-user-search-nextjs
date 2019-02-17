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
    textAlign: "left",
    overflow: "scroll"
  }
});

class UserPage extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  /* ----------------------------------------------------------------------------------
   * After mounting get user data by username from parameter values on url if exist then
   * fetch resulting data from github api. 
   * -------------------------------------------------------------------------------- */
  componentDidMount(){
    const { userActions } = this.props;
    // used for getting url params
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    if(vars.username){
      userActions.apiGithubUserAdditionalInfo({ username: vars.username });
    }
  }

  /* ----------------------------------------------------------------------------------
   * Clear User Data when routing to other page. 
   * -------------------------------------------------------------------------------- */
  componentWillUnmount(){
    const { userActions } = this.props;
    userActions.userSet({ user: {} });
  }

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
            <Tab label={`Repositories (${user.public_repos || 0})`} />
            <Tab label={`Followers (${user.followers || 0})`} />
            <Tab label={`Following (${user.following || 0})`} />
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

UserPage.propTypes = {
  user: PropTypes.object.isRequired,
  repositoryList: PropTypes.object.isRequired,
  followerList: PropTypes.object.isRequired,
  followingList: PropTypes.object.isRequired,
  userActions : PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserPage);
