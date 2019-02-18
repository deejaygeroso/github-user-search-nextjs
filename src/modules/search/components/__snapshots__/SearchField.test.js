import React from 'react';
import SearchField from '../SearchField';
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer
    .create(
        <SearchField onChange={()=>{}} onSubmit={()=>{}}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})