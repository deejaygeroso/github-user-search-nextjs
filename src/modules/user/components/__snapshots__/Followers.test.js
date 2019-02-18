import React from 'react';
import Followers from '../Followers';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const followerList = {
      allIds: [], byId: {}
  }
  const tree = renderer
    .create(<Followers followerList={followerList} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
