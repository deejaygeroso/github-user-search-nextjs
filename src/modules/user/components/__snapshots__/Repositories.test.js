import React from 'react';
import Repositories from '../Repositories';
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const repositoryList = {
      allIds: [], byId: {}
  }
  const tree = renderer
    .create(<Repositories repositoryList={repositoryList} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});