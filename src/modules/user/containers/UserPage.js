import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserPage from "../components/UserPage";

import * as userActions from "../../../actions/userActions";

export const mapStateToProps = state => ({
  user: state.user,
  repositoryList: state.repositoryList,
  followerList: state.followerList,
  followingList: state.followingList
});

export const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
