export enum ConnectionStatus {
    DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED'
}

export type TState = {
    boardId: string;
    userId: string;
    boardData: { wentWell: any[], notWell: any[], actionItems: any[], appreciations: any[] };
    safetyScores: number[]
    connectionStatus: ConnectionStatus,
    toastMessage: string,
    presenting: boolean
};

export type TAction = {
    type: string;
    [key: string]: any
};
