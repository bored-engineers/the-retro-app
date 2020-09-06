export type TState = {
    boardId: string;
    userId: string;
    notes: [];
    safetyScores: number[]
};

export type TAction = {
    type: string;
    [key: string]: any
};
