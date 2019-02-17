import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SpinLoader } from "react-css-loaders";
import Router from 'next/router'
import Typography from "@material-ui/core/Typography";

import SearchField from "./SearchField";
import UserCard from "./UserCard";
import PaginationCard from "./PaginationCard";

const styles = theme => ({
  root: {
    marginRight: 20,
    marginLeft: 20,
    paddingTop: theme.spacing.unit * 10
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  logo: {
    height: 80
  }
});

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      page: 1,
      offset: ""
    };
  }

  /* ----------------------------------------------------------------------------------
   * After mounting get username & page parameter values on url if exist then
   * fetch resulting data from github api. 
   * -------------------------------------------------------------------------------- */
  componentDidMount(){
    const { userActions } = this.props;
    // used for getting url params
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    if(vars.page){
      this.setState({page: parseInt(vars.page)})
    }
    if(vars.username){
      this.setState({username: vars.username})
      userActions.apiGithubSearchUsers({ username: vars.username, page: vars.page });
    }
  }
  
  /* ----------------------------------------------------------------------------------
   * For Listing Users and showing loading when data is still being fetched 
   * -------------------------------------------------------------------------------- */
  reunderUserCard() {
    const { userList, userRequestStatus } = this.props;
    // show loading css
    if (userRequestStatus.isFetching) {
      return <SpinLoader />;
    }
    return (
      <Fragment>
        {userList.allIds.length !== 0 &&
          userList.allIds.map(userId => (
            <UserCard key={userId} user={userList.byId[userId]} onClick={()=>this.navigateToUser(userList.byId[userId])}/>
          ))}
      </Fragment>
    );
  }

  /* ----------------------------------------------------------------------------------
   * Main Component. 
   * -------------------------------------------------------------------------------- */
  render() {
    const { classes, userList, userRequestStatus } = this.props;
    return (
      <div className={classes.root}>
        <img className={classes.logo} src="/static/assets/images/logo.jpg" alt="Github User Search"/>
        <Typography variant="h4" gutterBottom>
          Github User Search
        </Typography>
        <SearchField onSubmit={this.onSubmit} onChange={this.onSearchChange} />
        {this.reunderUserCard()}
        <br />
        <PaginationCard
          isHidden={userRequestStatus.isFetching}
          offset={(userList.page-1) * 20}
          total={userList.total_count}
          onClick={this.onPaginate}
        />
      </div>
    );
  }

  /* ----------------------------------------------------------------------------------
   * Navigate to user page. 
   * -------------------------------------------------------------------------------- */
  navigateToUser = (user) => {
    const { userActions } = this.props;
    userActions.apiGithubUserAdditionalInfo({username: user.login});
    Router.push({
      pathname: '/user',
      query: { username: user.login }
    })
  }

  /* ----------------------------------------------------------------------------------
   * While typing update username state. 
   * -------------------------------------------------------------------------------- */
  onSearchChange = username => {
    this.setState({ username });
  };

  /* ----------------------------------------------------------------------------------
   * Find user by username. 
   * -------------------------------------------------------------------------------- */
  onSubmit = username => {
    const { userActions } = this.props;
    this.setState({ username });
    userActions.apiGithubSearchUsers({ username });
    const href = `/?username=${username}`;
    const as = href;
    Router.replace(href, as, { shallow: true })
  };

  /* ----------------------------------------------------------------------------------
   * Find user by username with offset. 
   * -------------------------------------------------------------------------------- */
  onPaginate = page => {
    const { username } = this.state;
    const { userActions } = this.props;
    userActions.apiGithubSearchUsers({ username, page });
    const href = `/?username=${username}&page=${page}`;
    const as = href;
    Router.push(href, as, { shallow: true })
  };
}

SearchPage.propTypes = {
  userList: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  userRequestStatus: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchPage);
