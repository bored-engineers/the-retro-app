import * as actionTypes from './actions';
import { TState, TAction, ConnectionStatus } from './interfaces';

const initialState: TState = {
    boardId: '',
    userId: '',
    boardData: { wentWell: [], notWell: [], actionItems: [], appreciations: [] },
    safetyScores: [],
    connectionStatus: ConnectionStatus.DISCONNECTED
};

const getCategoryMap: { [key: string]: string } = {
    'went-well': 'wentWell',
    'not-well': 'notWell',
    'action-items': 'actionItems',
    'appreciations': 'appreciations'
};

const reducer = (state = initialState, action: TAction): TState => {
    console.log(action);

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
        case actionTypes.INITIALIZE_BOARD_DATA:
            const boardData: any = { wentWell: [], notWell: [], actionItems: [], appreciations: [] };
            action.notes.forEach((note: any) => boardData[getCategoryMap[note.category]].push(note));
            return {
                ...state,
                boardData: boardData,
                safetyScores: action.safetyScores
            }
        case actionTypes.NOTE_ADDED:
            const note = action.note;
            return {
                ...state,
                boardData: { ...state.boardData, [getCategoryMap[note.category]]: [...(state.boardData as any)[getCategoryMap[note.category]], note] },
            }
        case actionTypes.NOTE_REMOVED:
            return {
                ...state,
                boardData: {
                    ...state.boardData,
                    [getCategoryMap[action.note.category]]: (state.boardData as any)[getCategoryMap[action.note.category]].filter((note: any) => note.cardId !== action.note.cardId)
                }
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