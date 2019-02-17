import 'react';
import { bindActionCreators } from "redux";
import UserPage, { mapStateToProps, mapDispatchToProps } from '../UserPage';
import * as userActions from "../../../../actions/userActions";

describe('UserPage', ()=>{
    // this will be used for checking if props passed to component matches from props passed on the container
    const propTypes = Object.keys(UserPage.WrappedComponent.Naked.propTypes);
    let stateToProps = {};
    let dispatchToProps = {};

    propTypes.map(value=>{
        if(value!=='classes'){
            if(value.includes('Actions')){
                dispatchToProps[value] = value;
            }else{
                stateToProps[value] = value;
            }
        }
    });

    it('should map redux state to props', ()=>{
        const state = {
            user           : {},
            repositoryList : {},
            followerList   : {},
            followingList  : {},
        };
        expect(mapStateToProps(state)).toHaveProperty('user');
        expect(mapStateToProps(state)).toHaveProperty('repositoryList');
        expect(mapStateToProps(state)).toHaveProperty('followerList');
        expect(mapStateToProps(state)).toHaveProperty('followingList');
        expect(Object.keys(mapStateToProps(state))).toHaveLength(Object.keys(stateToProps).length)
    });

    it('should map dispatch to props', ()=>{
        const dispatch = jest.fn();
        // used Object.keys since its giving me an output of: Compared values have no visual difference.
        expect(Object.keys(mapDispatchToProps(dispatch).userActions)).toEqual(Object.keys(bindActionCreators(userActions, dispatch)));
        expect(Object.keys(mapDispatchToProps(dispatch))).toHaveLength(Object.keys(dispatchToProps).length);
    });

});
