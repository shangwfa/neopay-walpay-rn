import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    RefreshControl
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import BankOrderListSectionHeader from '../components/BankOrderListSectionHeader'
import BankOrderListItem from '../components/BankOrderListItem'
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class BankCardOrderListPage extends BasePage {
    page = 0
    dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    constructor(props)
    {
        super(props);
        this.state = {
            dataSource: this.dataSource.cloneWithRows(
                    [{
                        name: 'nader',
                        orderType: 'scan',
                        middleUpValue: '扫一扫付款',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:true,
                    },
                    {
                        name: 'chris',
                        orderType: 'payCode',
                        middleUpValue: '付款码付款',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:false,
                    },
                    {
                        name: 'anader',
                        orderType: 'redPocket',
                        middleUpValue: '大红包',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:false,
                    },
                    {
                        name: 'bchris',
                        orderType: 'mobile',
                        middleUpValue: '手机充值',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:false,
                    },
                    {
                        name: 'nick',
                        orderType: 'withDraw',
                        middleUpValue: '账户提现',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:true,
                    },
                    {
                        name: 'amanda',
                        orderType: 'mobileWithDraw',
                        middleUpValue: '手机充值退款',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:false,
                    },
                    {
                        name: 'enick',
                        orderType: 'shopAct',
                        middleUpValue: '商户活动-中秋活动',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:false,
                    },
                    {
                        name: 'ramanda',
                        orderType: 'sysAct',
                        middleUpValue: '平台活动-国庆活动',
                        middleBottomValue: '08-27 12:23',
                        rightUpValue: '-38.00',
                        isShowTime:false,
                    }
                ]),
        }
    }

    renderRow = (item) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
            <BankOrderListItem orderType={item.orderType}
                              middleUpValue={item.middleUpValue} middleBottomValue={item.middleBottomValue}
                              rightUpValue={item.rightUpValue} rightBottomValue={item.rightBottomValue}
                              isLine={true}/>
            </View>
                )
    }
    renderSectionHeader = (item)=>{
        if (item.isShowTime)
           return <BankOrderListSectionHeader title={'本月'} value='收入:789.78元 支出:-987.65元'/>
    }

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
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='银行卡交易记录'/>
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
        backgroundColor: colors.one_color
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default BankCardOrderListPage