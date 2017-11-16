import NetUtil from '../utils/NetUtil'
import {APIS} from "../constants/API"


getRedPacketRecord = (req, callback) => {
    NetUtil.post(APIS.QUERY_RED_PACKET_RECORD, req, (data) => {
        callback(data)
    })
}

modifyUserNickName = (req, callback) => {
    NetUtil.post(APIS.MODIFY_USER_NICKNAME, req, (data) => {
        callback(data)
    })
}

getBankInfoByCardNo = (req, callback) => {
    NetUtil.post(APIS.GET_BANK_INFO_BY_CARD_NO, req, (data) => {
        callback(data)
    })
}

bindBankCard = (req, callback) => {
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

getUserBillDetail = (request, callback) => {
    NetUtil.post(APIS.QUERY_USER_BILL_DETAIL, request, (data) => {
        callback(data);
    });
};
getRedPacketMessageList = (request, callback) => {
    NetUtil.post(APIS.QUERY_RED_PACKET_MSG_PAGE, request, (data) => {
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
getCreatePayQRCode = (request, callback) => {
    NetUtil.post(APIS.CREATE_PAY_QRCODE, request, (data) => {
        callback(data);
    });
};
geUserBankCardList = (request, callback) => {
    NetUtil.post(APIS.GET_USER_BANK_CARD_LIST, request, (data) => {
        callback(data);
    });
};
getBankCardRecordPage = (request, callback) => {
    NetUtil.post(APIS.QUERY_BANK_CARD_RECORD_PAGE, request, (data) => {
        callback(data);
    });
};
getBalanceRecordList = (request, callback) => {
    NetUtil.post(APIS.QUERY_BALANCE_RECORD_PAGE, request, (data) => {
        callback(data);
    });
};
getPhoneRechargeOrderQuery = (request, callback) => {
    NetUtil.post(APIS.PHONE_RECHARGE_ORDER_QUERY, request, (data) => {
        callback(data);
    });
};
getPhoneRechargeProductList = (request, callback) => {
    NetUtil.post(APIS.PHONE_RECHARGE_PRODUCT_LIST, request, (data) => {
        callback(data);
    });
};
getUserReceivableRedPacket = (request, callback) => {
    NetUtil.post(APIS.QUERY_USER_RECEIVABLE_RED_PACKET_PAGE, request, (data) => {
        callback(data);
    });
};
getSquareRedPacketList = (request, callback) => {
    NetUtil.post(APIS.QUERY_SQUARE_RED_PACKET_LIST, request, (data) => {
        callback(data);
    });
};
getRecentPayType = (request, callback) => {
    NetUtil.post(APIS.GET_RECENT_PAY_TYPE, request, (data) => {
        callback(data);
    });
};
createRedPacket = (request, callback) => {
    NetUtil.post(APIS.CREATE_RED_PACKET, request, (data) => {
        callback(data);
    });
};
payRedPacket = (request, callback) => {
    NetUtil.post(APIS.PAY_RED_PACKET, request, (data) => {
        callback(data);
    });
}
queryUserBill = (request, callback) => {
    NetUtil.post(APIS.USER_BILL_RECORD, request, (data) => {
        callback(data);
    })
};
queryPayMessage=(request,callback)=>{
    NetUtil.post(APIS)
}
export default {
    getRedPacketRecord,
    getUserInfo,
    queryBannerList,
    bindBankCard,
    getBankInfoByCardNo,
    modifyUserNickName,
    getUserBillDetail,
    getRedPacketList,
    getRedPacketMessageList,
    getMerchantBannerList,
    getMerchantActivityList,
    getUserMerchantList,
    getCreatePayQRCode,
    geUserBankCardList,
    getBankCardRecordPage,
    getBalanceRecordList,
    getPhoneRechargeOrderQuery,
    getPhoneRechargeProductList,
    getUserReceivableRedPacket,
    getSquareRedPacketList,
    getRecentPayType,
    createRedPacket,
    payRedPacket,
    queryUserBill,
    queryPayMessage,
}