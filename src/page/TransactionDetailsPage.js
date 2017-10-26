/**
 * @author: carlos.guo
 * @data:  2017/10/25.
 * @description: 交易详情--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet, View, Text, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView,
} from 'react-native'
import BasePage from "./BasePage";
import Header from "../components/Header";
import NetUtil from "../utils/NetUtil";
import {APIS} from "../constants/API";
import {TransFromPageBean} from "../moudle/TransFromPageBean";
import right_arrow from '../res/img/right_arrow.png';
import Space from "../components/Space";
import CommonButton from "../components/CommonButton";
let mData = [];
class TransactionDetailsPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: {},
            orderNo: this.props.navigation.state.params.info,
        }
    }

    componentWillMount() {
        //请求数据
        NetUtil.post(APIS.QUERY_USER_BILL_DETAIL, {"orderNo": this.state.orderNo}, (data) => {
            this.setState({
                sourceData: data,
            });
        });
    }

    render() {
        this._handleViewData(this.state.sourceData);
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='交易详情'/>
                <View style={{height: 168, backgroundColor: "blue"}}>
                </View>
                {/*详情列表*/}
                <FlatList
                    style={{backgroundColor: "red"}}
                    ref='FlatList'
                    ItemSeparatorComponent={this._renderItemLine}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    data={mData}
                    refreshing={false}
                />
                {/*提示*/}
                <View style={styles.tip}>
                    <Text style={{fontSize: 12}}>如对本次交易有任何疑问，请</Text>
                    <Text style={{fontSize: 12, color: "#0040F6"}} onPress={this._tipClick}>致电客服</Text>
                </View>
                {/*为了处理*FlatList会多余出来空间*/}
                <View style={{flex: 10000000000, backgroundColor: "blue"}}/>
                {/*按钮*/}
                {this._handleButtonView()}
            </View>
        );
    }

    _renderItem = ({item, index}) => {
        if (null !== item) {
            return (
                <TouchableWithoutFeedback onPress={() => item.onclick()}>
                    <View style={styles.container_item}>
                        <Text style={[styles.title, {marginLeft: 13}]}>{item.transformType}</Text>
                        <Space/>
                        <Text style={[styles.title, {marginRight: 10}]}>{item.transformContent}</Text>
                        {this._arrowImg(item.isShowArrows)}
                    </View>
                </TouchableWithoutFeedback>
            );
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
        alert("致电客服");
    };
    /*处理底部按钮*/
    _handleButtonView = () => {
        let id = 2;
        switch (id) {
            case 0:
                return this._renderButtonView(true, "立即支付", () => {
                    alert("立即支付");
                });
                break;
            case 1:
                return this._renderButtonView(true, "查看原订单交易详情", () => {
                    alert("查看原订单交易详情");
                });
                break;
            case 2:
                return this._renderButtonView(true, "查看红包领取情况", () => {
                    alert("查看红包领取情况");
                });
                break;

        }
    };
    _renderButtonView = (isShow, name, callBack) => {
        if (isShow) {
            return <CommonButton value={name} style={{marginBottom: 13}} onPress={callBack}/>;
        }
    };
    /*处理详情列表*/
    _handleViewData = (item) => {
        let id = 0;
        switch (id) {
            case 0://账户体现
                this._handleAccountsReflectType(item);
                break;
            case 1://待支付
                this._handleNoPaymentType(item);
                break;
        }
    };
    /*账户体现*/
    _handleAccountsReflectType(item) {
        mData = [];//必须清空，否则会重复显示
        this._payTypeItem(item);
        this._incomeTypeItem(item);
        this._tradeTypeItem(item);
        this._tradeTimeItem(item);
        this._tradeOrderNoItem(item);
    }

    /*待支付*/
    _handleNoPaymentType(item) {
        mData = [];//必须清空，否则会重复显示
        this._payTypeItem(item);
        this._tradeOrderMoneyItem(item);
        this._tradeTypeItem(item);
        this._tradeTimeItem(item);
        this._tradeOrderNoItem(item);
    }

    _payTypeItem(item) {
        let payType = new TransFromPageBean();
        payType.transformType = "付款方式";
        payType.transformContent = item.payTypeDesc;
        payType.isShowArrows = true;
        payType.onclick = () => {
            alert(payType.transformType);
        };
        mData.push(payType);
    };

    _incomeTypeItem(item) {
        let incomeType = new TransFromPageBean();
        incomeType.transformType = "收款方式";
        incomeType.transformContent = item.incomeTypeDesc;
        incomeType.isShowArrows = true;
        incomeType.onclick = () => {
            alert(incomeType.transformType);
        };
        mData.push(incomeType);
    };

    _tradeTypeItem(item) {
        let tradeType = new TransFromPageBean();
        tradeType.transformType = "交易方式";
        tradeType.transformContent = item.title;
        tradeType.isShowArrows = true;
        tradeType.onclick = () => {
            alert(tradeType.transformType);
        };
        mData.push(tradeType);
    };

    _tradeTimeItem(item) {
        let tradeTime = new TransFromPageBean();
        tradeTime.transformType = "交易时间";
        tradeTime.transformContent = item.tradeTime;
        tradeTime.onclick = () => {
        };
        mData.push(tradeTime);
    };

    _tradeOrderNoItem(item) {
        let tradeOrderNo = new TransFromPageBean();
        tradeOrderNo.transformType = "交易订单号";
        tradeOrderNo.transformContent = item.orderNo;
        tradeOrderNo.onclick = () => {
        };
        mData.push(tradeOrderNo);
    }

    _tradeOrderMoneyItem(item) {
        let tradeOrderMoney = new TransFromPageBean();
        tradeOrderMoney.transformType = "订单金额";
        tradeOrderMoney.transformContent = item.amount;
        tradeOrderMoney.onclick = () => {
        };
        mData.push(tradeOrderMoney);
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 12,
        marginTop: 13
    }

});

export default TransactionDetailsPage