import _debug from 'debug';
import axios from 'axios';

const debug = _debug('app:HttpClient');

export default class HttpClient {

    get(url, params) {
        debug('get()', url);

        return axios
                .get(url, params)
                .then((response) => response.data);
    }

    post(url, params) {
        debug('post()', url);

        return axios
                .post(url, params)
                .then((response) => response.data);
    }

}
