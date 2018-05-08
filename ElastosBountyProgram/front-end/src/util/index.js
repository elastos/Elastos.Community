import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router'

export const createContainer = (component, mapState, mapDispatch=_.noop())=>{
    return withRouter(connect(mapState, mapDispatch)(component));
};
