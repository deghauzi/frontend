import * as actionTypes from '../actions/ActionTypes'

const initialState = {
    sidebarShow:'responsive'
}

const ChangeSidebar = (state=initialState, {action, ...rest}) => {
   switch (action){
    case actionTypes.SHOW_SIDEBAR:
        return {
            ...state,
            ...rest    
        }
        default:
            return state
   }
}

export default ChangeSidebar