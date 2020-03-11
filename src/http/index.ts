import axios from 'axios';
import qs from 'qs';
import {Toast, Indicator} from 'mint-ui';

axios.defaults.withCredentials = true;
let baseUrl: string = process.env.VUE_APP_BASE_URL;
let apiOkCode: number = parseInt(process.env.VUE_APP_API_CODE_OK);

let instance = axios.create({
    baseURL: baseUrl
});
let headers = {
    'Authorization': '',
    // 'Access-Control-Allow-Origin': '*',
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
};

function flushPage(url: string) {
    if (url) {
        setTimeout(function () {
            window.location.href = url;
        }, 1500)
    }
}

function cusToast(msg: string) {
    Toast(msg)
}

function cusIndicator(type: number) {
    if (type === 1 || !type) {
        Indicator.open()
    } else {
        Indicator.close()
    }
}

/**
 * http POST 请求
 * @param path
 * @param data
 * @param reurl
 * @param type
 * @param auth
 * @returns {Promise<any>}
 */
export function post(path: string = '', data: object = {}, reurl: string = '', type: string = 'formData', auth: string = '') {
    cusIndicator(1);
    if (!path) {
        return new Promise((resolve, reject) => {
            cusIndicator(2);
            cusToast('Parameter [path] cannot is empty');
            reject(new Error('Parameter [path] cannot is empty'));
            flushPage(reurl);
        })
    }
    let url = path;
    if (type === 'formData') {
        headers['Accept'] = '*/*';
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (auth) {
        headers['Authorization'] = auth
    }

    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            headers: headers,
            transformRequest: [data => {
                if (type === 'json') {
                    return JSON.stringify(data)
                } else if (type === 'formData') {
                    return qs.stringify(data)
                }
            }]
        }).then(r => {
            cusIndicator(2);
            console.log('post:', r);
            if (r.status === 200) {
                if (typeof r.data.code === 'undefined') {
                    cusToast('服务器未响应状态码!');
                    flushPage(reurl);
                    return false
                }
                if (r.data.code !== apiOkCode) {
                    cusToast(r.data.msg);
                    flushPage(reurl);
                    return false
                }
                resolve(r.data)
            } else {
                cusToast('网络不给力,请稍后再试1!');
                flushPage(reurl);
            }
        }).catch(e => {
            cusIndicator(2);
            console.info(e);
            cusToast('网络不给力,请稍后再试2! :' + e);
            flushPage(reurl);
        })
    })
}

/**
 * GET 请求
 * @param path
 * @param data
 * @param reurl
 * @param auth
 * @returns {Promise<any>}
 */
export function get(path: string = '', data: object = {}, reurl: string = '', auth: string = '') {
    cusIndicator(1);
    if (!path) {
        return new Promise((resolve, reject) => {
            cusIndicator(2);
            cusToast('Parameter [path] cannot is empty');
            reject(new Error('Parameter [path] cannot is empty'));
            flushPage(reurl);
        })
    }

    let url = path;
    if (auth) {
        headers['Authorization'] = auth
    }

    return new Promise((resolve, reject) => {
        instance.get(url, {params: data, headers: headers}).then(r => {
            cusIndicator(2);
            console.log('get:', r);
            if (r.status === 200) {
                if (typeof r.data.code === 'undefined') {
                    cusToast('服务器未响应状态码!');
                    flushPage(reurl);
                    return false
                }

                if (r.data.code !== apiOkCode) {
                    cusToast(r.data.msg);
                    flushPage(reurl);
                    return false
                }
                resolve(r.data)
            } else {
                cusToast('网络不给力,请稍后再试1!');
                flushPage(reurl);
            }
        }).catch(e => {
            cusIndicator(2);
            cusToast('网络不给力,请稍后再试2! :' + e);
            flushPage(reurl);
        })
    })
}
