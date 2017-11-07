/**
 * @author: carlos.guo
 * @data:  2017/11/6.
 * @description: 话费、流量充值结果--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, FlatList, ScrollView,
} from 'react-native'
import Header from "../components/Header";
import ApiManager from "../utils/ApiManager";
import OrderStateComponent from "../components/OrderStateComponent";
import img_failed from "../res/img/img_failed.png"
import ButtonComponent from "../components/ButtonComponent";
import TransactionTypeDescUtils from "../utils/TransactionTypeDescUtils";
import BasePage from "./BasePage";
import CommonButton from "../components/CommonButton";
let mData = [];
class ChargeFluxResultPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: this.props.navigation.state.params.pageTitle,
            orderNo: this.props.navigation.state.params.orderNo,
            sourceData: {}
        }
    }

    componentWillMount() {
        ApiManager.getPhoneRechargeOrderQuery({"orderNo": this.state.orderNo}, (data) => {
            this.setState({
                sourceData: data,
            });
        });
    }

    render() {
        this._handleViewData(this.state.sourceData);
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={this.state.pageTitle}/>
                <ScrollView>
                    { this._handleHeaderView(this.state.sourceData)}
                    {/*详情列表*/}
                    <FlatList
                        style={{marginTop: 9, backgroundColor: "red"}}
                        ref='flatList'
                        ItemSeparatorComponent={this._renderItemLine}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={mData}
                        refreshing={false}
                    />
                    {/*按钮*/}
                    {this._handleButtonView(this.state.sourceData)}
                </ScrollView>
            </View>
        );
    }

    /*处理底部按钮*/
    _handleButtonView = (item) => {
        switch (item.orderStatus) {
            case 3://流量、话费--付款失败
                return this._renderButtonView(true, "重新充值", () => {
                    alert("重新充值");
                }, {marginTop: 50});
                break;

        }
    };
    /*处理详情列表*/
    _handleViewData = (item) => {
        switch (item.orderStatus) {//账单状态
            case 2://流量、话费--付款成功
            case 4://流量、话费--付款处理中
            case 5://流量、话费--到账成功
            case 6://流量、话费--到账失败
                this._handleChargeFluxType(item);
                break;
            case 3://流量、话费--付款失败
                this._handleChargeFluxFailedType(item);
                break;
        }
    };
    _handleChargeFluxFailedType = (item) => {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._rechargeContentItem(mData, item);
    };
    _handleChargeFluxType = (item) => {
        mData = [];//必须清空，否则会重复显示
        TransactionTypeDescUtils._rechargeContentItem(mData, item);
        TransactionTypeDescUtils._tradePrepaidContentItem(mData, item);
        TransactionTypeDescUtils._payTypeNoClickItem(mData, item);
    };
    _renderItem = ({item}, index) => {
        if (null !== item) {
            return (<ButtonComponent
                btnClick={item.onclick.bind(this)}
                leftTitle={item.transformType}
                rightTitle={item.transformContent}
                isShowRightArrows={item.isShowArrows}/>);
        }
    };
    _renderItemLine = () => {
        return (
            <View style={{backgroundColor: "#FFFFFF"}}>
                <View style={[{height: 1, marginLeft: 13, backgroundColor: "#F5F5F5"}]}/>
            </View>
        );
    };
    _keyExtractor = (item, index) => {
        return index;
    };
    _renderButtonView = (isShow, name, callBack, style) => {
        if (isShow) {
            return <CommonButton value={name} style={[style, {marginBottom: 10}]}
                                 onPress={callBack}/>;
        }
    };
    /*处理头部视图*/
    _handleHeaderView = (item) => {
        switch (item.orderStatus) {
            case 2://付款成功
            case 4://付款处理中
                return this._handleHeaderProcessView(item);
            case 3://付款失败
                return this._handleHeaderProcessFailedView();
                break;
        }
    };
    _handleHeaderProcessFailedView = () => {
        return <View style={styles.order_state_container}>
            <Image
                style={styles.img_failed}
                source={img_failed}/>
            <Text style={styles.txt_failed}>充值付款失败</Text>
        </View>;
    };
    _handleHeaderProcessView = (item) => {
        return <View style={styles.order_state_container}>
            {/*订单状态的状态*/}
            {this._handleOrderStateView(item)}
            <Text
                style={styles.order_amount}>-{item.amount}</Text>
            {/*订单状态的提示*/}
            {this._handleOrderStateTipView(item)}
        </View>
    };

    /*处理订单的状态*/
    _handleOrderStateView = (item) => {
        return <OrderStateComponent
            imgId={item.procImgUrl}
            stateStart={item.procDesc1}
            stateEnd={item.procDesc2}/>;
    };
    /*处理订单状态的提示*/
    _handleOrderStateTipView = (item) => {
        return <Text style={styles.order_state_tip}>{item.procStatusText}</Text>;
    };
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F5F5F5',
        },
        order_state_container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF"
        },
        order_state_tip: {
            marginTop: 25,
            marginBottom: 22,
            fontSize: 14,
            color: "#999999",
        },
        img_failed: {
            marginTop: 16,
            width: 47,
            height: 47,
            resizeMode: "cover"
        },
        txt_failed: {
            color: "#E94D3D",
            fontSize: 16,
            marginTop: 14,
            marginBottom: 22,
        },
        order_amount: {
            marginTop: 26,
            fontSize: 30,
            color: "#333333"
        },
    });

export
default
ChargeFluxResultPage