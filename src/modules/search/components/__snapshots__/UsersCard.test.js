import React from "react";
import UserCard from "../UserCard";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const user = {
    login: "username",
    followers: 650,
    following: 12
  };
  const tree = renderer
    .create(<UserCard user={user} onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
