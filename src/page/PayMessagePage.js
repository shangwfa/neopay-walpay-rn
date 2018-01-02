import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView,
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import PayMessageCell from '../components/PayMessageContentCell'
import {RefreshStatus} from "../components/RefreshList"
import RefreshList from '../components/RefreshList'
import ApiManager from '../utils/ApiManager'
import DateUtils from "../utils/DateUtils";
import {RouterPaths} from "../constants/RouterPaths";


class PayMessagePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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

            if(data.length>0){
                let firstMsg = data[0];
                //标记第一条消息已读
                ApiManager.queryMsgBillDetail({"billId": firstMsg.billId,"msgType":firstMsg.msgType,"id":firstMsg.id}, (data) => {
                    this.setState({
                        sourceData: data,
                    });
                });
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
                {/*<PayMessageCell createTime={item.createTime}*/}
                               {/*payNoticeType={item.payNoticeTypeText} payBy={item.payTypeDesc}*/}
                               {/*payTo={item.tradObject}*/}
                                {/*remark = {item.remark}*/}
                                {/*amount = {item.amount}*/}
                                {/*payDirection = {item.payDirection}*/}
                                {/*onPress={()=>this.pressOnItem(item)}*/}
                                {/*msgType = {item.payNoticeType}*/}
                                {/*bossName = {item.bossName}*/}
                                {/*phone = {item.phone}*/}
                                {/*productDesc={item.productDesc}*/}

                {/*/>*/}
                <PayMessageCell cellItem = {item} onPress={()=>this.pressOnItem(item)}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.disPlayDate) {

            return <View style={styles.dateHeader}><Text style={styles.dateHeaderText}>{DateUtils.getRecentDate(item.createTimeMs)}</Text></View>
        }
    }

    pressOnItem = (item)=>{
        // console.log('点击了消息条目');
        if(item.payNoticeType==7||item.payNoticeType==8||item.payNoticeType==9){
            this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, {packetCode: item.packetCode});
        }else {
            nav.navigate(RouterPaths.TRANSACTION_DETAILS,{billId:item.billId,msgType:item.msgType,id:item.id});
        }
        // console.log(`点击消息条目billId:${item.billId} msgType:${item.msgType}`);
    };


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