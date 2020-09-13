import io from 'socket.io-client';
import * as ActionType from './actions';

type TCustomEventHandlers = {
    [key: string]: (store: any) => (data: any) => void;
}

const SocketEmitEvents = {
    CREATE_NOTE: 'create-card',
    REMOVE_NOTE: 'remove-card',
    UPDATE_NOTE: 'update-card',
    UPDATE_VOTE: 'vote-card',
    UPDATE_SAFETY_SCORE: 'submit-safety-score'
};

const SocketListnerEvents = {
    INITIALIZE: 'welcome',
    NOTE_ADDED: 'add-card',
    SAFETY_SCORES_UPDATED: 'update-safety-scores',
    NOTE_REMOVED: 'remove-card'
};

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';

export const socketMiddleware = () => {
    let socket: SocketIOClient.Socket;
    const onConnectionSuccess = (store: any) => () => { store.dispatch({ type: ActionType.SOCKET_CONNECTED }); };
    const onDisconnection = (store: any) => () => { store.dispatch({ type: ActionType.SOCKET_DISCONNECTED }); };
    const customEventHandlers: TCustomEventHandlers = {
        [SocketListnerEvents.INITIALIZE]: (store: any) => (data: any) => {
            console.log(data);
            store.dispatch({ type: ActionType.INITIALIZE_BOARD_DATA, notes: data.cards, safetyScores: data.safetyScores })
        },
        [SocketListnerEvents.NOTE_ADDED]: (store: any) => (note: any) => { store.dispatch({ type: ActionType.NOTE_ADDED, note }) },
        [SocketListnerEvents.NOTE_REMOVED]: (store: any) => (note: any) => { store.dispatch({ type: ActionType.NOTE_REMOVED, note }) },
        [SocketListnerEvents.SAFETY_SCORES_UPDATED]: (store: any) => (safetyScores: any) => { store.dispatch({ type: ActionType.SET_SAFETY_SCORES, safetyScores }) },
    };

    return (store: any) =>
        (next: any) =>
            (action: any) => {
                switch (action.type) {
                    case ActionType.SOCKET_CONNECT:
                        {
                            if (Boolean(socket)) socket.close();
                            const { userId, boardId } = action;
                            socket = io(SOCKET_URL, { query: { userId, boardId } });
                            socket.on('connect', onConnectionSuccess(store));
                            socket.on('disconnect', onDisconnection(store));
                            Object.keys(customEventHandlers).forEach((event: string) => socket.on(event, customEventHandlers[event](store)));
                        }
                        break;
                    case ActionType.SOCKET_DISCONNECT:
                        if (Boolean(socket)) socket.close();
                        (socket as any) = null;
                        break;
                    case ActionType.CREATE_NOTE:
                        socket.emit(SocketEmitEvents.CREATE_NOTE, { category: action.categoryId, text: action.text });
                        break;
                    case ActionType.REMOVE_NOTE:
                        socket.emit(SocketEmitEvents.REMOVE_NOTE, action.noteId);
                        break;
                    case ActionType.UPDATE_NOTE:
                        socket.emit(SocketEmitEvents.UPDATE_NOTE, action.note);
                        break;
                    case ActionType.UPDATE_VOTE:
                        socket.emit(SocketEmitEvents.UPDATE_VOTE, action.note);
                        break;
                    case ActionType.UPDATE_SAFETY_SCORE:
                        socket.emit(SocketEmitEvents.UPDATE_SAFETY_SCORE, action.value);
                        break;
                    default:
                        return next(action);
                }
            };
}