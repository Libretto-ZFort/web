import axios from 'axios';
import {BASE_URL_API} from '../../config/env';

interface ChatGPTResponse {
    answer: string;
}

export const postMessage = async (message: string): Promise<ChatGPTResponse> => {
    try {
        const response = await axios.post(`${BASE_URL_API}/messages`, {question: message});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    postMessage,
};
