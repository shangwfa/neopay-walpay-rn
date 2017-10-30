import NetUtil from '../utils/NetUtil'
import {APIS} from "../constants/API";

getUserInfo = (callback) => {
    NetUtil.post(APIS.GET_USER_INFO, {}, (data) => {
        callback(data)
    })
};

getUserBillDetail = (request, callback) => {
    NetUtil.post(APIS.QUERY_USER_BILL_DETAIL, request, (data) => {
        callback(data);
    });
};
getRedPacketList = (request, callback) => {
    NetUtil.post(APIS.QUERY_RECENT_RED_PACKET_LIST, request, (data) => {
        callback(data);
    });
};
getMerchantBannerList = (request, callback) => {
    NetUtil.post(APIS.QUERY_MERCHANT_BANNER_LIST, request, (data) => {
        callback(data);
    });
};
getMerchantActivityList = (request, callback) => {
    NetUtil.post(APIS.QUERY_MERCHANT_ACTIVITY_PAGE, request, (data) => {
        callback(data);
    });
};
getUserMerchantList = (request, callback) => {
    NetUtil.post(APIS.QUERY_USER_MERCHANT_LIST, request, (data) => {
        callback(data);
    });
};
export default {
    getUserInfo,
    getUserBillDetail,
    getRedPacketList,
    getMerchantBannerList,
    getMerchantActivityList,
    getUserMerchantList
}