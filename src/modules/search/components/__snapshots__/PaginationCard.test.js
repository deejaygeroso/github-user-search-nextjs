import React from "react";
import PaginationCard from "../PaginationCard";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const props = {
    total: 10,
    offset: 20,
    onClick: () => {},
    isHidden: false
  };
  const tree = renderer.create(<PaginationCard {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
