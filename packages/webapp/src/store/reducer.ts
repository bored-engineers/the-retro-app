import * as actionTypes from './actions';
import { TState, TAction, ConnectionStatus } from './interfaces';

const initialState: TState = { boardId: '', userId: '', notes: [], safetyScores: [], connectionStatus: ConnectionStatus.DISCONNECTED };

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
        case actionTypes.SOCKET_CONNECTED:
            return {
                ...state,
                connectionStatus: ConnectionStatus.CONNECTED
            }
        case actionTypes.SOCKET_DISCONNECTED:
            return {
                ...state,
                connectionStatus: ConnectionStatus.DISCONNECTED
            }
        default: return state;
    }
}

export default reducer;