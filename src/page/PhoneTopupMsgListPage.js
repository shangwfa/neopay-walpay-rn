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
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import NetUtil from '../utils/NetUtil'
import * as RouterPaths from '../constants/RouterPaths'
import MsgCell from  '../components/PhoneTopupMsgCell'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

const dataV  = [
    {
        relustTilte: '充值到账成功',
        date: '09-09 12:12',
        topupType: '到账金额',
        amount: '38.00元',
        phone: '18877778888',
        payText: '余额',
        isShowTime: false
    },
    {
        relustTilte: '充值到账成功',
        date: '09-09 12:12',
        topupType: '到账金额',
        amount: '38.00元',
        phone: '18877778888',
        payText: '余额',
        isShowTime: false
    },{
        relustTilte: '充值到账成功',
        date: '09-09 12:12',
        topupType: '到账金额',
        amount: '38.00元',
        phone: '18877778888',
        payText: '余额',
        isShowTime: false
    }
]


class PhoneTopupMsgListPage extends BasePage {
    page = 0
    dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.dataSource.cloneWithRows([
                {
                    relustTilte: '充值到账成功',
                    date: '09-09 12:12',
                    topupType: '到账金额',
                    amount: '38.00元',
                    phone: '18877778888',
                    payText: '余额',
                    isShowTime: true
                },
                {
                    relustTilte: '充值到账成功',
                    date: '09-09 12:12',
                    topupType: '到账金额',
                    amount: '38.00元',
                    phone: '18877778888',
                    payText: '余额',
                    isShowTime: true
                },{
                    relustTilte: '充值到账成功',
                    date: '09-09 12:12',
                    topupType: '到账金额',
                    amount: '38.00元',
                    phone: '18877778888',
                    payText: '余额',
                    isShowTime: false
                }
            ])
        }
    }

    // componentWillMount() {
    //     NetUtil.post('pay/query_user_order_page', {}, (data) => {
    //         this.setState({
    //             data: data
    //         })
    //     })
    // }


    onLoadMore = (end) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.refs.listView.resetStatus() //重置上拉加载的状态
            end(this._page > 2)//刷新成功后需要调用end结束刷新
        }, 1500)
    }

    onRefresh = (end) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            end()//刷新成功后需要调用end结束刷新
        }, 1500)
    }
    renderRow = (item) => {
        console.log(item)
        return (
            <View>
                <MsgCell
                    isShow = {item.isShowTime}
                    dateValue = {item.date}
                    topupTypeValue = {item.topupType}
                    priceValue = {item.amount}
                    topupPhoneNum = {item.phone}
                    payType = {item.payText}
                    relustTilte = {item.relustTilte}/>
            </View>
        )

    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='手机充值' />
                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    ref="listView"
                    renderRow={this.renderRow}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    renderFooter={() => {
                        return
                        (<View style={{backgroundColor: 'blue', height: 30}}>
                            <Text>我是footer</Text>
                        </View>)
                    }}
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