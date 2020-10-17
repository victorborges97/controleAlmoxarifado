import { Router } from 'express';

import MaintenancesController from '@modules/maintenances/infra/http/controllers/MaintenancesController';

const maintenanceRouter = Router();
const maintenancesController = new MaintenancesController();

maintenanceRouter.post('/', maintenancesController.create);
maintenanceRouter.get('/', maintenancesController.list);
maintenanceRouter.patch('/', maintenancesController.update);

export default maintenanceRouter;
