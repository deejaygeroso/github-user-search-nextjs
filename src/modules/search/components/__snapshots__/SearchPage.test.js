import React from "react";
import SearchPage from "../SearchPage";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const userList = {
    allIds: [1, 2],
    byId: {
      1: {
        id: 1,
        login: "username 1",
        followers: 650,
        following: 12
      },
      2: {
        id: 2,
        login: "username 2",
        followers: 63,
        following: 24
      }
    },
    page: 1,
    total_count: 2,
  };
  const userRequestStatus = { isFetching: false };
  const userActions = {
    apiGithubSearchUsers : () => {},
    apiGithubUserAdditionalInfo : () => {}
  }
  const tree = renderer
    .create(
      <SearchPage
        userList={userList}
        userRequestStatus={userRequestStatus}
        userActions={userActions}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
