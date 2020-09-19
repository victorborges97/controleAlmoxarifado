import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Group from '../pages/Group';
import SubGroup from '../pages/SubGroup';
import Employees from '../pages/Employees';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/employees" exact component={Employees} />
    <Route path="/group" exact component={Group} />
    <Route path="/subGroup" exact component={SubGroup} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;