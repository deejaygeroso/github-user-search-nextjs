import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SpinLoader } from "react-css-loaders";
import Router from 'next/router'

import SearchField from "./SearchField";
import UserCard from "./UserCard";
import PaginationCard from "./PaginationCard";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      offset: ""
    };
  }
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
  render() {
    const { classes, userList, userRequestStatus } = this.props;
    return (
      <div className={classes.root}>
        <SearchField onSubmit={this.onSubmit} onChange={this.onSearchChange} />
        {this.reunderUserCard()}
        <PaginationCard
          isHidden={userRequestStatus.isFetching}
          offset={(userList.page-1) * 20}
          total={userList.total_count}
          onClick={this.onPaginate}
        />
      </div>
    );
  }
  navigateToUser = (user) => {
    const { username } = this.state;
    const { userActions } = this.props;
    userActions.userSet({user})
    userActions.apiGithubUserAdditionalInfo({username});
    Router.push({
      pathname: '/user',
      // query: { name: 'Zeit' }
    })
  }
  onSearchChange = username => {
    this.setState({ username });
  };
  onSubmit = username => {
    const { userActions } = this.props;
    this.setState({ username });
    userActions.apiGithubSearchUsers({ username });
  };
  onPaginate = page => {
    const { username } = this.state;
    const { userActions } = this.props;
    userActions.apiGithubSearchUsers({ username, page });
  };
}

SearchPage.propTypes = {
  userList: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  userRequestStatus: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchPage);
