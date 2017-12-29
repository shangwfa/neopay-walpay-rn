import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    ListView,
    TouchableWithoutFeedback
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import MsgCell from  '../components/PhoneTopupMsgCell'
import ApiManager from '../utils/ApiManager'
import DateUtils from '../utils/DateUtils'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import {
    SwRefreshListView,
} from 'react-native-swRefresh'


class PhoneTopupMsgListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isEmpty: false
        }
    }

    componentDidMount() {
        this.getPhoneTopupMsg(1,false,true)
    }

    onRefresh = () => {
        this.getPhoneTopupMsg(1, false)
    }

    onLoadMore = (page) => {
        this.getPhoneTopupMsg(page, true)
    }

    getPhoneTopupMsg =(pageNo,isLoadMore,isLoadding=false)=>{

        let body={
            pageNo: pageNo,
        }

        ApiManager.getPhoneTopupMsg(body, data => {
            if (isLoadMore) {
                const arrData = this.state.dataSource
                arrData.push(...data)
                this.setState({dataSource: arrData})
            } else {
                const empty = !data || data.length <= 0
                this.setState({dataSource: data, isEmpty: empty})
            }
        },isLoadding)
    }

    _renderRow = ({item}) => {
        console.log(item)
        return (

            <View>
                <MsgCell
                    isShow = {item.disPlayDate}
                    showDate = {DateUtils.getPhoneTopupMsgDate(item.createTimeMs)}
                    dateValue = {item.updateTime}
                    topupTypeValue = {item.content}
                    priceValue = {item.amount}
                    topupPhoneNum = {item.phone}
                    payType = {item.payTypeDesc}
                    relustTilte = {item.title}
                    onPress={()=>this.pressOnItem(item)}/>
            </View>
        )

    }

    pressOnItem=(item)=>{
        console.log('点击了手机充值条目');
        nav.navigate(RouterPaths.TRANSACTION_DETAILS,{billId:item.billId,msgType:item.msgType,id:item.id});
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='手机充值' />
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    isEmpty={this.state.isEmpty}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    list_header: {
        height: 40,
        backgroundColor: colors.page_background,
        alignItems:'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    top:{
        marginTop:15
    }
});

export default PhoneTopupMsgListPage