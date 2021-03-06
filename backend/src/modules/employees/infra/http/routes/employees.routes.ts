import { Router } from 'express';

import EmployeesController from '@modules/employees/infra/http/controllers/EmployeesController';

const employeesRouter = Router();
const employeesController = new EmployeesController();

employeesRouter.post('/', employeesController.create);
employeesRouter.get('/', employeesController.list);

export default employeesRouter;
