
import 'react';
import { bindActionCreators } from "redux";
import SearchPage, { mapStateToProps, mapDispatchToProps } from '../SearchPage';
import * as userActions from "../../../../actions/userActions";

describe('SearchPage', ()=>{
    // this will be used for checking if props passed to component matches from props passed on the container
    const propTypes = Object.keys(SearchPage.WrappedComponent.Naked.propTypes);
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
            user              : {},
            userList          : {},
            userRequestStatus : {},
        };
        expect(mapStateToProps(state)).toHaveProperty('userList');
        expect(mapStateToProps(state)).toHaveProperty('userRequestStatus');
        expect(Object.keys(mapStateToProps(state))).toHaveLength(Object.keys(stateToProps).length)
    });

    it('should map dispatch to props', ()=>{
        const dispatch = jest.fn();
        // used Object.keys since its giving me an output of: Compared values have no visual difference.
        expect(Object.keys(mapDispatchToProps(dispatch).userActions)).toEqual(Object.keys(bindActionCreators(userActions, dispatch)));
        expect(Object.keys(mapDispatchToProps(dispatch))).toHaveLength(Object.keys(dispatchToProps).length);
    });

});
