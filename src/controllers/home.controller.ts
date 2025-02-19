import {Request, Response } from 'express';
import HomeManager from '../managers/home.manager';
import ControlDto from '../dtos/control.dto';
import { ControlRow} from "../interfaces/types/ControlRow.interface";
import ControlReportDataRepository from "../repositories/MySql/controlReportData.repository";

export default class HomeController {
    async renderHome(req: Request, res: Response): Promise<void> {
        const manager = HomeManager.instance;
        const title = manager.getHomeTitle();

        const homeRepository = new ControlReportDataRepository();
        const controlDto = new ControlDto();
        try {
            const controlReports: ControlRow[] = await homeRepository.getWeekControlReportsHome();

            const rows = controlDto.bindControlReports(controlReports);

            res.render('index', { title: title.title, rows });
        } catch (error) {
            console.error("Dev-Error :Home Controller: Error fetching the control reports:", error);
            res.status(500).send("Error fetching the control reports.");
        }
    }
}