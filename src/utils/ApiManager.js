import NetUtil from '../utils/NetUtil'
import {APIS} from "../constants/API"

getCerfitySMSCode = (callback) => {
    NetUtil.post(APIS.SMSCODE_USER_CERFITY, {}, (data) => {
        callback(data)
    })
}

getBindBankCardSMSCode = (req, callback) => {
    NetUtil.post(APIS.SMSCODE_BIND_BANKCARD, req, (data) => {
        callback(data)
    })
}

submitUserCerfity = (req, callback) => {
    NetUtil.post(APIS.USER_CERFITY, req, (data) => {
        callback(data)
    })
}

getProvinceList = (callback) => {
    NetUtil.post(APIS.GET_PROVINCE_LIST, {}, (data) => {
        callback(data)
    })
}

getCityList = (req, callback) => {
    NetUtil.post(APIS.GET_CITY_LIST, req, (data) => {
        callback(data)
    })
}

getRpDetail = (req, callback) => {
    NetUtil.post(APIS.RP_GET_RP_DETAIL, req, (data) => {
        callback(data)
    })
}

getRpReceiverList = (req, callback) => {
    NetUtil.post(APIS.RP_GET_RECEIVER_LIST, req, (data) => {
        callback(data)
    })
}

getPhoneTopupRecordList = (req, callback) => {
    NetUtil.post(APIS.PHONE_TOPUP_RECORD_LIST, req, (data) => {
        callback(data)
    })
}

getPhoneTopupMsg = (req, callback, isLoadding) => {
    NetUtil.post(APIS.MESSAGE_TOPUP_PHONE, req, (data) => {
        callback(data)
    }, isLoadding)
}

getRedPacketRecord = (req, callback, isLoadding) => {
    NetUtil.post(APIS.QUERY_RED_PACKET_RECORD, req, (data) => {
        callback(data)
    }, isLoadding)
}

postUnBindBankCard = (req, callback) => {
    NetUtil.post(APIS.BANK_UNBIND_BANKCARD, req, (data) => {
        callback(data)
    })
}

getRedPacketThemeList = (callback) => {
    NetUtil.post(APIS.RED_PACKET_THEME, {}, (data) => {
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
modifyUserAvatarUrl = (request, callback) => {
    NetUtil.post(APIS.MODIFY_USER_AVATAR_URL, request, (data) => {
        callback(data)
    })
};

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
receiveRedPacket = (request, callback, errorCallback, netWorkCallback) => {
    NetUtil.post(APIS.RECEIVE_RED_PACKET, request, (data) => {
        callback(data);
    }, true, (errorData) => {
        errorCallback(errorData);
    }, (errData) => {
        netWorkCallback(errData);
    });
};
addRedPacketReceiver = (request, callback, errorCallback) => {
    NetUtil.post(APIS.ADD_RED_PACKET_RECEIVER, request, (data) => {
        callback(data);
    }, true, (errorData) => {
        errorCallback(errorData);
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
getUserPayTypeList = (request, callback) => {
    NetUtil.post(APIS.GET_USER_PAY_TYPE_LIST, request, (data) => {
        callback(data);
    });
};
checkNeedBindCard = (request, callback) => {
    NetUtil.post(APIS.CHECK_NEED_BIND_CARD, request, (data) => {
        callback(data);
    });
};
payRedPacketVerify = (request, callback) => {
    NetUtil.post(APIS.PAY_RED_PACKET_VERIFY, request, (data) => {
        callback(data);
    });
};
getRedPacketPayStatus = (request, callback) => {
    NetUtil.post(APIS.GET_RED_PACKET_PAY_STATUS, request, (data) => {
        callback(data);
    });
};
getServiceInfo = (request, callback) => {
    NetUtil.post(APIS.GET_SERVICE_INFO, request, (data) => {
        callback(data);
    });
};
logoutUser = (request, callback) => {
    NetUtil.post(APIS.LOGOUT_USER, request, (data) => {
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
queryPhoneRechargeDataList = (request, callback) => {
    NetUtil.post(APIS.QUERY_PHONE_RECHARGE_DATA_LIST, request, (data) => {
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
payRedPacket = (request, callback, errorCallback) => {
    NetUtil.post(APIS.PAY_RED_PACKET, request, (data) => {
        callback(data);
    }, true, (errorData) => {
        errorCallback(errorData);
    });
};
queryUserBill = (request, callback, isLoadding) => {
    NetUtil.post(APIS.USER_BILL_RECORD, request, (data) => {
        callback(data);
    }, isLoadding)
};
queryPayMessage = (request, callback) => {
    NetUtil.post(APIS.QUERY_PAY_MESSAGE_PAGE, request, (data) => {
        callback(data);
    })
};
createPhoneRechargeOrder = (request, callback) => {
    NetUtil.post(APIS.CREATE_PHONE_RECHARGE_ORDER, request, (data) => {
        callback(data);
    })
};
getUserRedPacketStats = (request, callback) => {
    NetUtil.post(APIS.GET_USER_RED_PACKET_STATS, request, (data) => {
        callback(data);
    })
};
getwithdrawbalance = (request, callback) => {
    NetUtil.post(APIS.GET_WITHDRAW_BALANCE, request, (data) => {
        callback(data);
    })
};
getRecentWithdrawBankCard = (request, callback) => {
    NetUtil.post(APIS.GET_RECENT_WITHDRAW_BANKCARD, request, (data) => {
        callback(data);
    })
};
getUserBankCardList = (request, callback) => {
    NetUtil.post(APIS.GET_USER_BANK_CARD_LIST, request, (data) => {
        callback(data);
    })
}
createWithdrawOrder = (request, callback) => {
    NetUtil.post(APIS.CREATE_WITHDRAW_BALANCE, request, (data) => {
        callback(data);
    })
};
withdraworder = (request, callback) => {
    NetUtil.post(APIS.WITHDRAW_ORDER, request, (data) => {
        callback(data);
    })
};
getRecentPhoneRechargePhone = (request, callback) => {
    NetUtil.post(APIS.GET_RECENT_PHONE_RECHARGE_PHONE, request, (data) => {
        callback(data);
    },false,null,null,false)
};
queryMsgBillDetail = (request, callback) => {
    NetUtil.post(APIS.QUERY_MSG_BILL_DETAIL, request, (data) => {
        callback(data);
    })
}
export default {
    getCerfitySMSCode,
    getBindBankCardSMSCode,
    submitUserCerfity,
    getProvinceList,
    getCityList,
    getRpDetail,
    getRpReceiverList,
    getPhoneTopupRecordList,
    getPhoneTopupMsg,
    getRedPacketRecord,
    postUnBindBankCard,
    getRedPacketThemeList,
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
    getUserPayTypeList,
    payRedPacketVerify,
    getRedPacketPayStatus,
    addRedPacketReceiver,
    getServiceInfo,
    logoutUser,
    getBankCardRecordPage,
    getBalanceRecordList,
    receiveRedPacket,
    getPhoneRechargeOrderQuery,
    getPhoneRechargeProductList,
    queryPhoneRechargeDataList,
    getUserReceivableRedPacket,
    getSquareRedPacketList,
    getRecentPayType,
    createRedPacket,
    payRedPacket,
    queryUserBill,
    checkNeedBindCard,
    modifyUserAvatarUrl,
    queryPayMessage,
    createPhoneRechargeOrder,
    getUserRedPacketStats,
    getwithdrawbalance,
    getRecentWithdrawBankCard,
    getUserBankCardList,
    createWithdrawOrder,
    withdraworder,
    getRecentPhoneRechargePhone,
    queryMsgBillDetail,
}