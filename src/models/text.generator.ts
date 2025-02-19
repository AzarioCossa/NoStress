import { ApiRepository } from '../repositories/api.repository';
import { TextStructure } from './text.structure';

export class AIContentGenerator {
    private repository: ApiRepository;
    private machineRole: string;
    private textStructure: TextStructure;
    private pageNumber: number;
    private topic: string;

    constructor(topic: string, pageNumber: number = 10) {
        this.repository = new ApiRepository();
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
            const response = await this.repository.generateContent(this.getRequestBody());
            console.log('Generated Content:', JSON.stringify(response, null, 2));
        } catch (error) {
            console.error('Failed to generate content:', error);
        }
    }
}
