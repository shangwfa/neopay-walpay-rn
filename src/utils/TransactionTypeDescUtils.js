/**
 * @author: carlos.guo
 * @data:  2017/11/6.
 * @description: 交易类型说明item--utils
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import StringUtils from "./StringUtils";
import {RouterPaths} from "../constants/RouterPaths";
_payTypeItem = (mData, item) => {
    let payType = {
        transformType: "付款方式",
        transformContent: item.payTypeDesc,
        isShowArrows: true,
    };
    payType.onclick = () => {
        let pageType = StringUtils.isContainChildrenStr(item.payTypeDesc, "余额") ? 0 : 1;
        nav.navigate(RouterPaths.TRADE_RECORD_LIST_PAGE, {pageType: pageType});
    };
    mData.push(payType);
};
_payTypeNoClickItem = (mData, item) => {
    let payType = {
        transformType: "付款方式",
        transformContent: item.payTypeDesc,
        isShowArrows: false,
    };
    payType.onclick = () => {
    };
    mData.push(payType);
};

_incomeTypeItem = (mData, item) => {
    let incomeType = {
        transformType: "收款方式",
        transformContent: item.incomeTypeDesc,
        isShowArrows: true,
    };
    incomeType.onclick = () => {
        let pageType = StringUtils.isContainChildrenStr(item.incomeTypeDesc, "余额") ? 0 : 1;
        nav.navigate(RouterPaths.TRADE_RECORD_LIST_PAGE, {pageType: pageType});
    };
    mData.push(incomeType);
};

_tradeTypeItem = (mData, item) => {
    let tradeType = {
        transformType: "交易方式",
        transformContent: item.tradeType,
        isShowArrows: true,
    };
    tradeType.onclick = () => {
        nav.navigate(RouterPaths.MY_ORDER_PAGE, {tradeType: item.tradeType});
    };
    mData.push(tradeType);
};

_tradeTimeItem = (mData, item) => {
    let tradeTime = {
        transformType: "交易时间",
        transformContent: item.tradeTime,
        isShowArrows: false,
    };
    tradeTime.onclick = () => {
    };
    mData.push(tradeTime);
};

_tradeOrderNoItem = (mData, item) => {
    let tradeOrderNo = {
        transformType: "交易订单号",
        transformContent: item.orderNo,
        isShowArrows: false,
    };
    tradeOrderNo.onclick = () => {
    };
    mData.push(tradeOrderNo);
};

_tradeOrderMoneyItem = (mData, item) => {
    let tradeOrderMoney = {
        transformType: "订单金额",
        transformContent: item.amount,
        isShowArrows: false,
    };
    tradeOrderMoney.onclick = () => {
    };
    mData.push(tradeOrderMoney);
};

_tradePrepaidContentItem = (mData, item) => {
    let prepaidContent = {
        transformType: "充值内容",
        transformContent: item.productDesc,
        isShowArrows: false,
    };
    prepaidContent.onclick = () => {
    };
    mData.push(prepaidContent);
};

_tradeTipContentItem = (mData, item) => {
    let tipContent = {
        transformType: "备注",
        transformContent: item.remark,
        isShowArrows: false,
    };
    tipContent.onclick = () => {
    };
    mData.push(tipContent);
};
_rechargeContentItem = (mData, item) => {
    let tipContent = {
        transformType: "充值手机号",
        transformContent: item.rechargePhone,
        isShowArrows: false,
    };
    tipContent.onclick = () => {
    };
    mData.push(tipContent);
};
export default {
    _payTypeItem,
    _payTypeNoClickItem,
    _tradeTypeItem,
    _incomeTypeItem,
    _tradeTimeItem,
    _tradeOrderNoItem,
    _tradeOrderMoneyItem,
    _tradePrepaidContentItem,
    _tradeTipContentItem,
    _rechargeContentItem,
}