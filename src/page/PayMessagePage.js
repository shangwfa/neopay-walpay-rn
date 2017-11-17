import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import PayMessageCell from '../components/PayMessageContentCell'
import {RefreshStatus} from "../components/RefreshList"
import RefreshList from '../components/RefreshList'
import ApiManager from '../utils/ApiManager'


class PayMessagePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": true,
                    "id": 100,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 99,
                    "amount": 36.99000,
                    "payNoticeType": 1,
                    "payNoticeTypeText": "扫一扫付款",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 2,
                    "payDirectionText": "付款",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 99,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 98,
                    "amount": 36.99000,
                    "payNoticeType": 11,
                    "payNoticeTypeText": "商户活动，收钱",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 1,
                    "payDirectionText": "收钱",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 98,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 97,
                    "amount": 36.99000,
                    "payNoticeType": 10,
                    "payNoticeTypeText": "商户活动，付款",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 2,
                    "payDirectionText": "付款",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 97,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 96,
                    "amount": 36.99000,
                    "payNoticeType": 9,
                    "payNoticeTypeText": "红包退款",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 1,
                    "payDirectionText": "收钱",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 96,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 95,
                    "amount": 36.99000,
                    "payNoticeType": 8,
                    "payNoticeTypeText": "发红包",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 2,
                    "payDirectionText": "付款",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 95,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 94,
                    "amount": 36.99000,
                    "payNoticeType": 7,
                    "payNoticeTypeText": "领红包",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 1,
                    "payDirectionText": "收钱",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 94,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 93,
                    "amount": 36.99000,
                    "payNoticeType": 6,
                    "payNoticeTypeText": "余额充值",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 2,
                    "payDirectionText": "付款",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 93,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 92,
                    "amount": 36.99000,
                    "payNoticeType": 5,
                    "payNoticeTypeText": "提现",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 1,
                    "payDirectionText": "收钱",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 92,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 91,
                    "amount": 36.99000,
                    "payNoticeType": 4,
                    "payNoticeTypeText": "手机充值",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 2,
                    "payDirectionText": "付款",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                },
                {
                    "msgType": 2,
                    "msgTypeText": "支付消息",
                    "dayCode": "20171026",
                    "disPlayDate": false,
                    "id": 91,
                    "uuid": "AnJ8xUoCkpVccr0Z",
                    "billId": 90,
                    "amount": 36.99000,
                    "payNoticeType": 3,
                    "payNoticeTypeText": "退款",
                    "tradObject": "胡萝卜的兔子店",
                    "phone": "18081840103",
                    "productDesc": "30元流量",
                    "payDirection": 1,
                    "payDirectionText": "收钱",
                    "readStatus": 2,
                    "readStatusText": "未读",
                    "deleteStatus": 1,
                    "deleteStatusText": "有效",
                    "createTime": "2017-10-26 14:24:31",
                    "createTimeMs": 1508999071000,
                    "updateTime": "2017-10-26 14:24:31",
                    "updateTimeMs": 1508999071000
                }
            ],
            footerStatus: RefreshStatus.IDLE,
        }
    }
    componentDidMount() {
        this.loadData(1,false)
    }

    loadData = (pageNo,isLoadMore) => {
        ApiManager.queryPayMessage({pageNo: pageNo}, data => {
            if(data.length<10){
                this.setState({footerStatus:RefreshStatus.END})
            }else {
                this.setState({footerStatus:RefreshStatus.IDLE})
            }

            if(isLoadMore){
                const arrData=this.state.data
                arrData.push(...data)
                this.setState({data: arrData})
            }else {
                this.setState({data: data})
            }


        })
    }


    onLoadMore = (page) => {
        this.loadData(page,true)
    }

    onRefresh = () => {
        this.loadData(1,false)
    }
    renderItem = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <PayMessageCell createTime={item.createTime}
                               payNoticeType={item.payNoticeTypeText} payBy={item.payNoticeTypeText}
                               payTo={item.tradObject}
                                remark = {item.remark}
                                amount = {item.amount}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.disPlayDate) {
            return <View style={styles.dateHeader}><Text style={styles.dateHeaderText}>{item.createTime}</Text></View>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='支付消息' />
                <RefreshList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    extraData={this.state}
                    footerStatus={this.state.footerStatus}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:colors.page_background,
    },

    dateHeader:{
        height:30,
        alignItems:'center',
    },
    dateHeaderText:{
        color:'#666666',
        marginTop:13,
    }


});

export default PayMessagePage