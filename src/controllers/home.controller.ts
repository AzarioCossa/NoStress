import { Request, Response } from 'express';
import { TextGenerator } from '../models/text.generator';

export default class HomeController {
    async renderHome(req: Request, res: Response): Promise<void> {
        try {
            const generator = new TextGenerator('Inteligência Artificial', 5);
            const content = await generator.generateContent();

            res.render('index', { content });
        } catch (error) {
            console.error('Error generating content:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}
