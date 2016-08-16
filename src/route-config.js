import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import AppShell from './views/AppShell';

import Home from './views/home/Home';

export const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={AppShell}>
            <IndexRoute component={Home} />
        </Route> 
    </Router>
);
