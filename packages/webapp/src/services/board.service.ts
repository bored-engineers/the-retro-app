import axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

const getBoard = async (boardId: string) => {
    try {
        const { boardId: boardIdResult } = (await axios.get(`${SERVICE_URL}/api/boards/${boardId}`)).data;
        return boardIdResult;
    } catch (e) {
        if (!e.response) throw new Error('There is some problem in joining board. Try Again Later...');
        if (e.response.status === 404) throw new Error('Invalid Board ID');
    }
}

const joinBoard = async (boardId: string, userId: string) => {
    try {
        return (await axios.post(`${SERVICE_URL}/api/boards/join/${boardId}?userid=${userId}`)).data;
    }
    catch (e) {
        if (!e.response) throw new Error('There is some problem in joining board. Try Again Later...');
        if (e.response.status === 404) throw new Error('Invalid Board ID');
    }
}

const createBoard = async () => {
    return (await axios.post(`${SERVICE_URL}/api/boards`)).data.boardId;
}

const getBoardData = async (boardId: string) => {
    try {
        return (await axios.get(`${SERVICE_URL}/api/boards/${boardId}/export`)).data;
    } catch (e) {
        if (!e.response) throw new Error('There is some problem. Try Again Later...');
        if (e.response.status === 404) throw new Error('Invalid Board ID');
    }
}

export { getBoard, createBoard, joinBoard, getBoardData };