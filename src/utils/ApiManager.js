import NetUtil from '../utils/NetUtil'
import {APIS} from "../constants/API"

modifyUserNickName = (req,callback) => {
    NetUtil.post(APIS.MODIFY_USER_NICKNAME, req, (data) => {
        callback(data)
    })
}

getBankInfoByCardNo = (req,callback) => {
    NetUtil.post(APIS.GET_BANK_INFO_BY_CARD_NO, req, (data) => {
        callback(data)
    })
}

bindBankCard = (req,callback) => {
    NetUtil.post(APIS.BIND_BANK_CARD, req, (data) => {
        callback(data)
    })
}

queryBannerList = (callback) => {
    NetUtil.post(APIS.QUERY_BANNER_LIST, {}, (data) => {
        callback(data)
    })
}

getUserInfo = (callback) => {
    NetUtil.post(APIS.GET_USER_INFO, {}, (data) => {
        callback(data)
    })
}


export default {
    getUserInfo,
    queryBannerList,
    bindBankCard,
    getBankInfoByCardNo,
    modifyUserNickName
}