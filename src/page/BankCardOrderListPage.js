import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    SectionList,
    RefreshControl
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import BankOrderListSectionHeader from '../components/BankOrderListSectionHeader'
import BankOrderListItem from '../components/BankOrderListItem'
import LoadMoreFooter from '../components/LoadMoreFooter'


const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'
const dataSource = [
    {
        data:
            [
                {
                    name: 'nader',
                    orderType: 'scan',
                    middleUpValue: '扫一扫付款',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                },
                {
                    name: 'chris',
                    orderType: 'payCode',
                    imgUrl: url,
                    middleUpValue: '付款码付款',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                },
                {
                    name: 'anader',
                    orderType: 'redPocket',
                    imgUrl: url,
                    middleUpValue: '大红包',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                },
                {
                    name: 'bchris',
                    orderType: 'mobile',
                    imgUrl: url,
                    middleUpValue: '手机充值',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00',
                }],

        key: '本月'
    },
    {
        data:
            [
                {
                    name: 'nick',
                    orderType: 'withDraw',
                    imgUrl: url,
                    middleUpValue: '账户提现',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'amanda',
                    orderType: 'mobileWithDraw',
                    imgUrl: url,
                    middleUpValue: '手机充值退款',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'enick',
                    orderType: 'shopAct',
                    imgUrl: url,
                    middleUpValue: '商户活动-中秋活动',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                },
                {
                    name: 'ramanda',
                    orderType: 'sysAct',
                    imgUrl: url,
                    middleUpValue: '平台活动-国庆活动',
                    middleBottomValue: '08-27 12:23',
                    rightUpValue: '-38.00'
                }],
        key: '9月'
    },
]

class BankCardOrderListPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = (item) => {
        return <BankOrderListItem orderType={item.item.orderType}
                              middleUpValue={item.item.middleUpValue} middleBottomValue={item.item.middleBottomValue}
                              rightUpValue={item.item.rightUpValue} rightBottomValue={item.item.rightBottomValue}
                              isLine={true}/>
    }

    renderHeader = (headerItem) => {
        return <BankOrderListSectionHeader title={headerItem.section.key} value='收入:789.78元 支出:-987.65元'/>
    }
    loadMoreData=()=>{
        console.log('加载更多')
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的账单' rightTitle='筛选' onRightPress={() => {
                    console.log('筛选')
                }}/>
                <SectionList
                    ListFooterComponent={<LoadMoreFooter isShow={true} isEnd={false}/>}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderHeader}
                    sections={dataSource}
                    keyExtractor={(item) => item.name}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                console.log('下拉刷新')
                            }}
                            tintColor="red"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="gray"/>
                    }
                    onEndReached={()=>this.loadMoreData()}
                    onEndReachedThreshold={0.5}
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