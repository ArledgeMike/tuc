import _ from 'lodash';
import BaseStore from 'fluxible/addons/BaseStore';

class AppBaseStore extends BaseStore {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    setState(state) {
        _.assign(this.state, state);
        this.emitChange();
    }

    getState() {
        return _.clone(this.state);
    }

}

export default AppBaseStore;
