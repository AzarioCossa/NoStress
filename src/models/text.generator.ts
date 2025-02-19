import axios from 'axios';
import { env } from 'process';
import { TextStructure } from './text.structure';

export class TextGenerator {
    private apiKey: string;
    private endpoint: string;
    private machineRole: string;
    private textStructure: TextStructure;
    private pageNumber: number;
    private topic: string;

    constructor(topic: string, pageNumber: number = 10) {
        this.apiKey = env.GEMINI_API_KEY || '';
        this.endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        this.machineRole = 'Você é um sistema de criação de trabalhos de pesquisa para estudantes. Você usa o português moçambicano, e o seu objetivo é ajudar os estudantes a escrever trabalhos de pesquisa de alta qualidade.';
        this.textStructure = new TextStructure();
        this.pageNumber = pageNumber;
        this.topic = topic;
    }

    private getRequestBody(): object {
        return {
            contents: [{
                parts: [{
                    text: `${this.machineRole}, faça um trabalho com ${this.pageNumber} páginas tendo como estrutura ${this.textStructure.structure} sobre o tema ${this.topic}.`,
                }]
            }]
        };
    }

    public async generateContent(): Promise<void> {
        try {
            const response = await axios.post(this.endpoint, this.getRequestBody(), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Generated Content:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error calling Gemini API:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
}

/*
const aiGenerator = new AIContentGenerator('Inteligência Artificial', 10);
aiGenerator.generateContent();
*/