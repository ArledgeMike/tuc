import Fluxible from 'fluxible';

import HttpPlugin from './plugins/HttpPlugin';
import HttpClient from './plugins/HttpClient';

import HomeStore from './views/home/HomeStore';

const app = new Fluxible({
    component: null,
    
    stores: [
        HomeStore
    ]

});

app.plug(new HttpPlugin(new HttpClient()));

export default app;
