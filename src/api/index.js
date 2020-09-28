import Axios from 'axios';
import { baseURL, RESPONSE_CODES } from '../constants/API';
import Utility from '../services/UtilityService';

import { omitBy, isNil } from 'lodash';
import { message } from 'antd';

const axios = Axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    responseType: 'json'
});

axios.interceptors.request.use((config) => {

    if (!!Utility.domain) { config.headers['X-WIDGET-HOST'] = `${Utility.domain}`; }
    if (!!Utility.token) { config.headers['Authorization'] = `Bearer ${Utility.token}`; }

    return config;
},(err) => Promise.reject(err));

class HTTPService {
    static post({ url, headers = {}, data = {} }) {
        data = omitBy(data, isNil);
        return axios.post(url, data, {
            headers: {
                //'X-Access-Token': token,
                ...headers
            }
        })
            .then(HTTPService.checkAuthorization);
    }

    static put({ url, headers = {}, data = {} }) {
        data = omitBy(data, isNil);
        return axios.put(url, data, {
            headers: {
                //'X-Access-Token': token,
                ...headers
            }
        })
            .then(HTTPService.checkAuthorization);
    }

    static get({ url, headers = {}, params = {}, data = {} }) {
        return axios.get(url, {
            headers: {
                //'X-Access-Token': token,
                ...headers
            },
            params: {
                ...params
            },
            data: data
        })
            .then(HTTPService.checkAuthorization);
    }

    static delete({ url, headers = {} }) {
        return axios.delete(url, {
            headers: {
                //'X-Access-Token': token,
                ...headers
            }
        })
            .then(HTTPService.checkAuthorization);
    }

    static checkAuthorization({ data = {} }) {
        if (data.code === RESPONSE_CODES.SUCCESS) {
            // API success nothing to do
        } else if (data.code === RESPONSE_CODES.UNAUTHORIZED) {
            message.error(data.message);
        }/* else {
            console.log("Here")
            message.error(data.message || 'Error occured.');
        }*/
        return data;
    }
}

export default HTTPService;