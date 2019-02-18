import React from 'react';
import Header from '../Header';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const user = {}
  const tree = renderer
    .create(<Header user={user} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});