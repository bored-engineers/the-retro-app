export enum ConnectionStatus {
    DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED'
}

export type TState = {
    boardId: string;
    userId: string;
    notes: [];
    safetyScores: number[]
    connectionStatus: ConnectionStatus
};

export type TAction = {
    type: string;
    [key: string]: any
};
