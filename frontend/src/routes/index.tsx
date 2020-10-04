import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

import Group from '../pages/Group';
import ListGroup from '../pages/ListGroup';

import Employees from '../pages/Employees';
import ListEmployees from '../pages/ListEmployees';

import SubGroup from '../pages/SubGroup';
import ListSubGroup from '../pages/ListSubGroup';

import Departament from '../pages/Departament';
import ListDepartament from '../pages/ListDepartament';

import Equipament from '../pages/Equipament';
import ListEquipament from '../pages/ListEquipament';

import ListMaintenanceTypes from '../pages/ListMaintenanceTypes';
import MaintenanceTypes from '../pages/MaintenanceTypes';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/listEmployees" exact component={ListEmployees} />
    <Route path="/employees" exact component={Employees} />

    <Route path="/listGroup" exact component={ListGroup} />
    <Route path="/group" exact component={Group} />

    <Route path="/listDepartament" exact component={ListDepartament} />
    <Route path="/departament" exact component={Departament} />

    <Route path="/listSubGroup" exact component={ListSubGroup} />
    <Route path="/subGroup" exact component={SubGroup} />

    <Route path="/listEquipament" exact component={ListEquipament} />
    <Route path="/equipament" exact component={Equipament} />

    <Route
      path="/listMaintenanceTypes"
      exact
      component={ListMaintenanceTypes}
    />
    <Route path="/maintenanceTypes" exact component={MaintenanceTypes} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
