import axios from 'axios';
import { generatePDF } from '../services/board.export';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';
// console.log(`Connecting to backend: ${SERVICE_URL}`);

const getBoard = async (boardId: string) => {
    try {
        const { boardId: boardIdResult } = (await axios.get(`${SERVICE_URL}/api/boards/${boardId}`)).data;
        return boardIdResult;
    } catch (e) {
        if (!e.response) throw new Error('There is some problem in joining board. Try Again Later...');
        if (e.response.status === 404) throw new Error('Invalid Board ID');
    }
}

const joinBoard = async (boardId: string) => {
    try {
        const boardJoiningResult = (await axios.post(`${SERVICE_URL}/api/boards/join/${boardId}`)).data;
        return boardJoiningResult;
    }
    catch(e){
        if (!e.response) throw new Error('There is some problem in joining board. Try Again Later...');
        if (e.response.status === 404) throw new Error('Invalid Board ID');
    }
}

const createBoard = async () => {
    const { boardId } = (await axios.post(`${SERVICE_URL}/api/boards`)).data;
    return boardId;
}
const exportBoard = async (boardId: string) => {
    try {
        const cardResult: any[] = (await axios.get(`${SERVICE_URL}/api/boards/${boardId}/export`)).data;
        generatePDF(cardResult, boardId);
    } catch (e) {
        if (!e.response) throw new Error('There is some problem. Try Again Later...');
        if (e.response.status === 404) throw new Error('Invalid Board ID');
    }
}

export {
    getBoard,
    createBoard,
    exportBoard,
    joinBoard
}