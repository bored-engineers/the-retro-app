import axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';


const getBoard = async (boardId: string) => {
    
}

const createBoard = async () => {
    console.log(`Connecting to backend: ${SERVICE_URL}`);
    const result = await axios.post(`${SERVICE_URL}/api/boards`);
    console.log('result', result);
}


export {
    getBoard,
    createBoard
}