import { Router } from 'express';
import companyController from '../../Modules/CompanyDashboard/controllers/company.controller.js';

const companyRouter = Router()

companyRouter.get('/job-create/step-1', companyController.getSkills)

export default companyRouter