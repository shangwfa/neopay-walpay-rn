import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView
} from 'react-native'
import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import CommonItemTwo from '../components/CommonItemTwo'
import {RouterPaths} from '../constants/RouterPaths'
import ApiManager from '../utils/ApiManager'
import RefreshList from '../components/RefreshList'
import {RefreshStatus} from "../components/RefreshList"
const url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507787767410&di=eac401274fbb9b107a0bd65a9b71e37a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc495bd1722381f308a1485eac168267d%2Fe824b899a9014c0834bca78a007b02087bf4f41e.jpg'

class MyOrderPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-20 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: true
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-20 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-20 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-20 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-20 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },

                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-10 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: true
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-10 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-10 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-10 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: true
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-10 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
                {
                    iconUrl: url,
                    title: '胡萝卜的兔子店',
                    tradeTime: '2017-10-10 15:31:16',
                    amount: '-38.00',
                    status: '付款处理中',
                    displayDate: false
                },
            ],
            footerStatus: RefreshStatus.IDLE
        }
    }

    componentWillMount() {
        this.loadData(1,false)
    }

    loadData = (pageNo,isLoadMore) => {
        ApiManager.queryUserBill({pageNo: pageNo}, data => {
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
    renderItem = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title}
                               middleBottomValue={item.tradeTime}
                               rightUpValue={item.amount}
                               rightBottomValue={item.status}
                               isLine={true}
                                onPress={()=>{
                                    nav.navigate(RouterPaths.TRANSACTION_DETAILS,{orderNo:item.orderNo})
                                }}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.displayDate) {
            return <SectionHeader title={item.tradeTime} value='查看月账单'/>
        }
    }
    onRefresh = () => {
        this.loadData(1,false)
    }
    onLoadMore = (page) => {
        console.log("上拉加载更多")
        this.loadData(page,true)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的账单' rightTitle='筛选' onRightPress={() => {
                    this.props.navigation.navigate(RouterPaths.FILTER_PAGE)
                }}/>

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
    list_header: {
        height: 40,
        backgroundColor: colors.one_color
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default MyOrderPage