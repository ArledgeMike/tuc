//import _debug from 'debug';
import AppBaseStore from '../AppBaseStore';

class HomeStore extends AppBaseStore {

    static storeName = 'HomeStore';

    static handlers = {
        LOAD_PROFILE: 'loadProfile',
    };

    constructor() {
        super();

        // Initial state
        this.state = {
        };
    }

    loadProfile(prof){

        this.setState({
            profile: profileInfo
        });
    }

}

export default HomeStore;
