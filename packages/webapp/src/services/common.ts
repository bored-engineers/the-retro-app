import axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

export const wakeUpServer = async () => {
    const {status} = (await axios.get(`${SERVICE_URL}/api/health`)).data;
    if (status === 'up') return true;
    else throw new Error('There is some problem with waking up servers. Please try again after some time.');
}