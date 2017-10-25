import NetUtil from '../utils/NetUtil'
import API from '../constants/API'

getUserInfo = (callback) => {
    NetUtil.post(API.GET_USER_INFO, {}, (data) => {
        callback(data)
    })
}


export default {
    getUserInfo,

}