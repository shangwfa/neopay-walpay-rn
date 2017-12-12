/**
 * @author: carlos.guo
 * @data:  2017/10/25.
 * @description: 交易详情--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView, NativeModules
} from 'react-native'
import BasePage from "./BasePage";
import Header from "../components/Header";
import right_arrow from '../res/img/right_arrow.png';
import Space from "../components/Space";
import CommonButton from "../components/CommonButton";
import ApiManager from "../utils/ApiManager";
import OrderStateComponent from "../components/OrderStateComponent";
import TransactionTypeDescUtils from "../utils/TransactionTypeDescUtils";
import ButtonComponent from "../components/ButtonComponent";
import {RouterPaths} from "../constants/RouterPaths";
let mData = [];
class TransactionDetailsPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: {},
            serviceSourceData: {},
            orderNo: this.props.navigation.state.params.orderNo,
        }
    }

    componentWillMount() {
        ApiManager.getUserBillDetail({"orderNo": this.state.orderNo}, (data) => {
            this.setState({
                sourceData: data,
            });
        });
        ApiManager.getServiceInfo({}, (data) => {
            this.setState({
                serviceSourceData: data
            })
        });
    }

    render() {
        this._handleViewData(this.state.sourceData);
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='交易详情'/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{backgroundColor: "#F5F5F5"}}>
                    <View style={styles.order_state_container}>
                        {/*订单状态的标题*/}
                        {this._renderOrderStateTitleView()}
                        {/*订单状态的状态*/}
                        {this._handleOrderStateView(this.state.sourceData)}
                        <Text
                            style={styles.order_amount}>{this._handleOrderAmountTypeView()}{this.state.sourceData.amount}</Text>
                        {/*订单状态的提示*/}
                        {this._handleOrderStateTipView(this.state.sourceData)}
                    </View>
                    {/*详情列表*/}
                    <FlatList
                        style={{marginTop: 7}}
                        ref='FlatList'
                        ItemSeparatorComponent={this._renderItemLine}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={mData}
                        refreshing={false}
                    />
                    {/*提示*/}
                    {this._renderTipView()}
                    {/*按钮*/}
                    {this._handleButtonView(this.state.sourceData)}
                </ScrollView>
            </View>
        );
    }

    _renderItem = ({item}, index) => {
        if (null !== item) {
            return (<ButtonComponent
                btnClick={item.onclick.bind(this)}
                leftTitle={item.transformType}
                rightTitle={item.transformContent}
                isShowRightArrows={item.isShowArrows}/>);
        }
    };
    _keyExtractor = (item, index) => {
        return index;
    };
    _arrowImg = (isShow) => {
        if (isShow) {
            return <Image style={styles.img} source={right_arrow}/>;
        } else {
            return <View style={{width: 22}}/>;
        }
    };
    _renderItemLine = () => {
        return (
            <View style={{backgroundColor: "#FFFFFF"}}>
                <View style={[{height: 1, marginLeft: 13, backgroundColor: "#F5F5F5"}]}/>
            </View>
        );
    };
    _tipClick = () => {
        NativeModules.commModule.rnCallNativeCallPhone(this.state.serviceSourceData.serviceTel);
    };
    /*处理底部按钮*/
    _handleButtonView = (item) => {
        switch (item.billStatus) {
            case 4://待支付
                return this._renderButtonView(true, "立即支付", () => {
                    alert("立即支付");
                }, {marginTop: 50});
                break;
            case 5://退款
            case 17://商户付款成功
            case 25://账户提现退款
                return this._renderButtonView(true, "查看原订单交易详情", () => {
                    nav.goBack();
                }, {marginTop: 100});
                break;
            case 6://红包领取成功
            case 7://红包付款成功
            case 10://红包退款成功
                return this._renderButtonView(true, "查看红包领取情况", () => {
                    this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, {packetCode: item.packetCode});
                }, {marginTop: 50});
                break;
        }
    };
    /*处理详情列表*/
    _handleViewData = (item) => {
        switch (item.billStatus) {//账单状态
            case 1://扫一扫、付款码--付款成功
            case 2://扫一扫、付款码--付款失败
            case 3://扫一扫、付款码--付款处理中
            case 4://扫一扫、付款码--待付款
                this._handleNoPaymentType(item);
                break;
            case 5://扫一扫、付款码--退款成功
                this._handleNoPaymentRebateType(item);
                break;
            case 6://红包--领取成功
                this._handleReceiveRedPacketType(item);
                break;
            case 7://红包--付款成功
            case 8://红包--付款失败
            case 9://红包--付款处理中
            case 10://红包--退款
                this._handleRedPacketType(item);
                break;
            case 11://手机充值--付款成功，处理中
            case 12://手机充值--付款失败
            case 13://手机充值--付款处理中
            case 14://手机充值--到账成功
            case 15://手机充值--到账失败
                this._handlePhoneRechargingType(item);
                break;
            case 16://手机充值--退款
                this._handlePhoneRechargingRebateType(item);
                break;
            case 19://账户充值--成功
            case 20://账户充值--失败
            case 21://账户充值--处理中
            case 22://账户提现--成功
            case 23://账户提现--失败
            case 24://账户提现--处理中
                this._handleAccountsReflectType(item);
                break;
            case 25://账户提现--退款成功
                this._handleAccountsReflectRebateType(item);
                break;
            case 17://商户活动--付款成功
            case 26://商户活动--付款失败
            case 27://商户活动--付款处理中
            case 18://商户活动--收款成功
            case 28://商户活动--收款失败
            case 29://商户活动--收款处理中
                this._handleMerchantActivityType(item);
                break;

        }
    };
    /*处理订单状态的提示*/
    _handleOrderStateTipView = (item) => {
        return this._renderOrderStateTipView(item.procStatusText);
    };
    /*处理订单的状态*/
    _handleOrderStateView = (item) => {
        if (undefined !== item.procDesc2 || undefined !== item.procDesc1 || undefined !== item.procImgUrl) {
            return this._renderOrderStateView(item.procImgUrl, item.procDesc1, item.procDesc2);
        } else {
            return null;
        }
    };
    /*处理订单金额的支出方式*/
    _handleOrderAmountTypeView = () => {
        switch (this.state.sourceData.payDrection) {
            case 1://收款
                return "-";
                break;
            case 2://付款
                return "+";
                break;
        }
    };
    _renderOrderStateTipView = (tip) => {
        return <Text style={styles.order_state_tip}>{tip}</Text>;
    };
    _renderTipView = () => {
        return <View style={[styles.tip]}>
            <Text style={{fontSize: 12}}>如对本次交易有任何疑问，请</Text>
            <Text style={{fontSize: 12, color: "#0040F6"}} onPress={this._tipClick}>致电客服</Text>
        </View>;
    };
    _renderOrderStateTitleView = () => {
        return <View style={[styles.order_state_title_container, {marginTop: 23}]}>
            <Image
                style={{width: 25, height: 25, resizeMode: "cover"}}
                source={{uri: this.state.sourceData.iconUrl}}/>
            <Text style={{
                marginLeft: 9, fontSize: 16, color: "#000000"
            }}>{this.state.sourceData.title}</Text>
        </View>;
    };
    _renderButtonView = (isShow, name, callBack, style) => {
        if (isShow) {
            return <CommonButton value={name} style={[style, {marginBottom: 10}]}
                                 onPress={callBack}/>;
        }
    };
    _renderOrderStateView = (imgId, stateStart, stateEnd) => {
        return <OrderStateComponent
            imgId={imgId}
            stateStart={stateStart}
            stateEnd={stateEnd}/>;
    };
    /*------------账户提现相关------------*/
    /*账户提现状态*/
    _handleAccountsReflectType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }

    /*账户提现状态--退款*/
    _handleAccountsReflectRebateType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._incomeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }

    /*------------扫一扫、付款码相关------------*/
    /*扫一扫、付款码交易详情状态*/
    _handleNoPaymentType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._payTypeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderMoneyItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }

    /*扫一扫、付款码交易详情状态--退款*/
    _handleNoPaymentRebateType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._incomeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }

    /*------------手机充值相关------------*/
    /*手机充值状态*/
    _handlePhoneRechargingType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._payTypeItem(mData, item);
        TransactionTypeDescUtils._tradePrepaidContentItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }

    /*手机充值状态--退款*/
    _handlePhoneRechargingRebateType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._payTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }

    /*------------红包相关------------*/
    /*红包状态*/
    _handleRedPacketType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._payTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
        TransactionTypeDescUtils._tradeTipContentItem(mData, item);
    }

    /*红包状态--领取*/
    _handleReceiveRedPacketType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._incomeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
        TransactionTypeDescUtils._tradeTipContentItem(mData, item);
    }

    /*------------商户平台活动相关------------*/
    /*s商户活动--收款成功、付款成功*/
    _handleMerchantActivityType(item) {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._payTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTypeItem(mData, item);
        TransactionTypeDescUtils._tradeTimeItem(mData, item);
        TransactionTypeDescUtils._tradeOrderNoItem(mData, item);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    container_item: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    img: {
        width: 7,
        height: 12,
        marginRight: 13
    },
    title: {
        fontSize: 14,
    },
    tip: {
        height: 12,
        marginTop: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50
    },
    order_state_container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    order_state_title_container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    order_amount: {
        marginTop: 26,
        fontSize: 30,
        color: "#333333"
    },
    order_state_tip: {
        marginTop: 25,
        marginBottom: 22,
        fontSize: 14,
        color: "#999999",
    },

});

export default TransactionDetailsPage