import * as actionTypes from './actions';
import { TState, TAction } from './interfaces';

const initialState: TState = {
    boardId: '',
    userId: '',
    notes: [],
    safetyScores: []
}

const reducer = (state = initialState, action: TAction): TState => {
    switch (action.type) {
        case actionTypes.SET_BOARDID:
            return {
                ...state,
                boardId: action.boardId
            }
        case actionTypes.SET_USERID:
            return {
                ...state,
                userId: action.userId
            }
        case actionTypes.SET_SAFETY_SCORES:
            return {
                ...state,
                safetyScores: action.safetyScores
            }
        default: return state;
    }
}

export default reducer;