import React, {Component} from 'react'
import {NativeModules} from 'react-native'
import netCode from '../constants/netCode'

class NetUtil extends Component {

    static baseUrl = 'http://139.224.11.160:8202/walpay-web/'


    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static post(urlPath, callback) {
        NativeModules.commModule.netCommParas((originalata) => {
            let params = JSON.parse(originalata)
            console.log(NetUtil.transform(NetUtil.baseUrl, urlPath, params))
            var fetchOption = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };

            fetch(NetUtil.transform(NetUtil.baseUrl, urlPath, data), fetchOption)
                .then((response) => response.text())
                .then((responseText) => {
                    console.log(responseText)
                    callback(JSON.parse(responseText).data)
                })
                .done()
        })

    }


    static post(urlPath, successCallbak, failedCallback, errorCallback, isShowLoading) {
        if (isShowLoading) {
            NativeModules.commModule.showLoadingDialog('')
        }

        NativeModules.commModule.netCommParas((originalata) => {
            let params = JSON.parse(originalata)
            console.log(NetUtil.transform(NetUtil.baseUrl, urlPath, params))
            var fetchOption = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };

            fetch(NetUtil.transform(NetUtil.baseUrl, urlPath, data), fetchOption)
                .then((response) => response.text())
                .then((responseText) => {
                    console.log(responseText)
                    let response = JSON.parse(responseText);
                    if (netCode.netOk == response.retCode) {
                        successCallbak(response.data)
                    } else {
                        //TODO 异常处理
                        failedCallback(response.netCode, response.retMsg)
                    }
                    if (isShowLoading) NativeModules.commModule.hideLoadingDialog()
                })
                .catch((err) => {
                    if (isShowLoading) NativeModules.commModule.hideLoadingDialog()
                    console.log(err)
                    errorCallback(err)
                })
                .done()
        })

    }

    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static postJson(urlPath, data, callback) {
        NativeModules.commModule.netCommParas((originalata) => {
            console.log(originalata)
            let params = JSON.parse(originalata)
            Object.assign(data, params);
            console.log(data)
            console.log(NetUtil.transform(NetUtil.baseUrl, urlPath, data))
            var fetchOption = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };

            fetch(NetUtil.transform(NetUtil.baseUrl, urlPath, data), fetchOption)
                .then((response) => response.text())
                .then((responseText) => {
                    console.log(responseText)
                    callback(JSON.parse(responseText).data)
                })
                .done()
        })

    }

    /**
     * get请求
     * url : 请求地址
     * callback : 回调函数
     */
    static get(urlPath, callback) {
        NativeModules.commModule.netCommParas((originalata) => {
            let params = JSON.parse(originalata)
            var fetchOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            fetch(NetUtil.transform(NetUtil.baseUrl, urlPath, params), fetchOptions)
                .then((response) => response.text())
                .then((responseText) => {
                    callback(JSON.parse(responseText));
                }).done()
        })

    }


    /**
     * put请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static putJson(urlPath, data, callback) {

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
                .then((response) => {
                    console.log(response)
                    console.log(response)
                    return response.text()
                })
                .then((responseText) => {
                    console.log(responseText)
                    callback(JSON.parse(responseText))
                })
                .done();
        })

    }

    static transform(hostUrl, methodUrl, obj) {

        let responseUrl = hostUrl + methodUrl + '?';
        for (var key in obj) {//用javascript的for/in循环遍历对象的属性
            responseUrl += key + "=" + obj[key] + "&";
        }
        let index = responseUrl.lastIndexOf('&');
        responseUrl = responseUrl.substring(0, index);
        console.log(responseUrl)
        return responseUrl;

    }

}

export default NetUtil;
