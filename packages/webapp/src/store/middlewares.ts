import io from 'socket.io-client';
import * as ActionType from './actions';

type TCustomEvents = {
    [key: string]: (data: any) => void;
}

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '';

export const socketMiddleware = () => {
    let socket: SocketIOClient.Socket;
    const onConnectionSuccess = (store: any) => () => { store.dispatch({ type: ActionType.SOCKET_CONNECTED }) };
    const onConnectionError = (store: any) => (error: Error) => { };
    const onDisconnection = (store: any) => () => { store.dispatch({ type: ActionType.SOCKET_DISCONNECTED }) };
    const customEvents: TCustomEvents = {
        'welcome': (data: any) => console.log(data)
    };

    return (store: any) =>
        (next: any) =>
            (action: any) => {
                switch (action.type) {
                    case ActionType.SOCKET_CONNECT:
                        {
                            const { userId, boardId } = action;
                            socket = io(SOCKET_URL, { query: { userId, boardId } });
                            socket.on('connect', onConnectionSuccess(store));
                            socket.on('connect_error', onConnectionError(store));
                            socket.on('disconnect', onDisconnection(store));
                            Object.keys(customEvents).forEach((event: string) => socket.on(event, customEvents[event]));
                        }
                        break;
                    case ActionType.SOCKET_DISCONNECT: break;
                    default:
                        return next(action);
                }
            };
}