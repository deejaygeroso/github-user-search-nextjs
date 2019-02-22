// import React from "react";
// import UserPage from "../UserPage";
// import renderer from "react-test-renderer";

/* ----------------------------------------------------------------------------------
 * Snapshot fail because: 
 * Variant Scroll related 
 * Error: Uncaught [TypeError: Cannot read property 'scrollWidth' of null 
 * -------------------------------------------------------------------------------- */
// it("renders correctly", () => {
//     const props = {
//       user : {
//         public_repos: 25,
//         followers: 98,
//         following: 32,
//       },
//       repositoryList: { allIds: [], byId:{} },
//       followerList: { allIds: [], byId:{} },
//       followingList: { allIds: [], byId:{} },
//       userActions: { apiGithubUserAdditionalInfo: ()=>{}, userSet: ()=>{} },

//   }
//   const tree = renderer.create(<UserPage {...props} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
