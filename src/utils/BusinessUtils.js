import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
/**
 * @author: carlos.guo
 * @data:  2017/12/13.
 * @description: 业务处理--工具
 */
/**************************************特殊业务处理集************************************/
/**
 *
 * @param billProcessStatus 订单状态
 * @returns {string} 根据订单状态获取颜色
 */
getColorByBillState = (billProcessStatus) => {
    let textColor = "#999";
    switch (billProcessStatus) {
        case 1://代付款
            textColor = "#f34646";
            break;
        case 2://处理中
            textColor = "#fca32f";
            break;
        case 3://成功
            textColor = "#999";
            break;
        case 4://失败
            textColor = "#999";
            break;
    }
    return textColor;
};
export default{
    getColorByBillState,
}