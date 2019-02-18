import React from 'react';
import Following from '../Following';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const followingList = {
      allIds: [], byId: {}
  }
  const tree = renderer
    .create(<Following followingList={followingList} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});