import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SearchPage from "../components/SearchPage";

import * as userActions from "../../../actions/userActions";

export const mapStateToProps = state => ({
  user: state.user,
  userList: state.userList,
  userRequestStatus: state.userRequestStatus
});

export const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
