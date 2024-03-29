import React, {Component} from 'react'
import {NativeModules, DeviceEventEmitter} from 'react-native'
import netCode from '../constants/netCode'
import {events} from '../constants/index'
const TEST_URL = "http://139.224.11.160:8202/walpay-web/";
const MOCK_URL = "http://172.16.33.151:8888/walpay-web/";
const PROXY_URL = "http://172.22.1.47:8202/walpay-web/";

class NetUtil extends Component {

    static baseUrl;

    static handleException(code, msg,isShowMsg) {
        // let isShowMsg = true
        switch (code) {
            case 104://用户未登录
                break
        }

        if (isShowMsg) NativeModules.commModule.toast(msg)

    }

    /**设置超时时间*/
    static timeout(ms, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
        })
    }

    static post(urlPath, data, successCallbak, isShowLoading = true, errorCallback, netWorkCallback,isShowMsg=true) {
        if (isShowLoading) {
            NativeModules.commModule.showLoadingDialog()
        }
        NativeModules.commModule.netCommUrl((url) => {
            let baseUrl = JSON.parse(url);
            NetUtil.baseUrl = baseUrl.baseUrl;
        });
        NativeModules.commModule.netCommParas((originalata) => {
            console.log('公共参数' + originalata)
            let params = JSON.parse(originalata)
            Object.assign(data, params);
            var fetchOption = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            NetUtil.timeout(10000, fetch(NetUtil.transform(NetUtil.baseUrl, urlPath, data), fetchOption))
                .then((response) => {
                    console.log(response)
                    return response.text()
                })
                .then((responseText) => {
                    if (isShowLoading) NativeModules.commModule.hideLoadingDialog()
                    console.log(responseText)
                    let response = JSON.parse(responseText);
                    if (netCode.netOk === response.retCode) {
                        successCallbak(response.data);
                    } else {
                        let errorData = {
                            retCode: response.retCode,
                            retMsg: response.retMsg,
                        };
                        errorCallback ? errorCallback(errorData) : this.handleException(response.retCode, response.retMsg,isShowMsg)
                    }
                })
                .catch((err) => {
                    if (isShowLoading) NativeModules.commModule.hideLoadingDialog();
                    console.log(err);
                    if (netWorkCallback) {
                        let errData = {errMsg: err};
                        netWorkCallback(errData);
                    }
                    NativeModules.commModule.toast('网络不给力')
                })
                .done()

        })

    }

    /**
     * put请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static put(urlPath, data, successCallbak, isShowLoading = true) {

        NativeModules.commModule.netCommParas((originalata) => {
            let params = JSON.parse(originalata)
            Object.assign(data, params);
            console.log(data)
            var fetchOption = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    //此处使用的LeanCloud
                    'X-LC-Id': 'M401fErHUPYhDKmgp0wjqVRX-gzGzoHsz',
                    'X-LC-Key': 'Jqnvt1Lmt34vQh1JDRUpRAqq'
                },
                body: JSON.stringify(data)//服务器不支持，body传参数
            };
            fetch(NetUtil.transform(NetUtil.baseUrl, urlPath, data), fetchOption)
                .then((response) => response.text())
                .then((responseText) => {
                    let response = JSON.parse(responseText);
                    if (netCode.netOk == response.retCode) {
                        successCallbak(response.data)
                    } else {
                        this.handleException(response.retCode, response.retMsg)
                    }
                    if (isShowLoading) NativeModules.commModule.hideLoadingDialog()
                })
                .catch((err) => {
                    if (isShowLoading) NativeModules.commModule.hideLoadingDialog()
                    console.log(err)
                    NativeModules.commModule.toast('网络不给力')
                })
                .done();
        })

    }

    static transform(hostUrl, methodUrl, obj) {
        let responseUrl = hostUrl + methodUrl + '?';
        for (var key in obj) {//用javascript的for/in循环遍历对象的属性
            let value = obj[key] ? obj[key] : "";
            responseUrl += key + "=" + value + "&";
        }
        let index = responseUrl.lastIndexOf('&');
        responseUrl = responseUrl.substring(0, index);
        console.log(responseUrl)
        return responseUrl;

    }

}

export default NetUtil;
