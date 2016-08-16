import React from 'react';
import {render} from 'react-dom';
import {FluxibleComponent} from 'fluxible-addons-react';
import debug from 'debug';

import fluxibleApp from './fluxibleApp';
import {routes} from './route-config';

debug.enable('app:*');

const context = fluxibleApp.createContext();
const componentContext = context.getComponentContext();

render((
    <FluxibleComponent context={componentContext}>
        {routes}
    </FluxibleComponent>
), document.getElementById('root'));
