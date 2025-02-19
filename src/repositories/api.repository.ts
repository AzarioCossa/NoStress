import axios from 'axios';
import { env } from 'process';
import { ApiResponse } from '../models/types/api.response.type';

export class ApiRepository {
    private apiKey: string;
    private endpoint: string;
    private apiResponse: ApiResponse;

    constructor() {
        this.apiKey = env.GEMINI_API_KEY || '';
        this.endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        this.apiResponse = new ApiResponse(); 
    }

    public async generateContent(requestBody: object): Promise<ApiResponse> {
        try {
            const response = await axios.post(this.endpoint, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            this.apiResponse.setContent(JSON.stringify(response.data));
            return this.apiResponse;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error calling Gemini API:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }
}
