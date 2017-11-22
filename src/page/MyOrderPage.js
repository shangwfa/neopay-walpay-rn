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
class MyOrderPage extends BasePage {
    queryType=''//订单类型
    payDirection=''//交易方向
    startTime=''//开始时间
    endTime=''//结束时间

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isEmpty:false
        }

        if(this.props.navigation.state.params) this.queryType=this.props.navigation.state.params.tradeType
    }

    componentWillMount() {
        this.loadData(1,false)
    }

    emitEvent=(event)=>{
        this.queryType=event.data.tradeType
        this.payDirection=event.data.incomeType
        this.startTime=event.data.startTime
        this.endTime=event.data.endTime
        this.loadData(1,false)
    }

    loadData = (pageNo,isLoadMore) => {
        const req={
            pageNo: pageNo,
            queryType:this.queryType,
            payDirection:this.payDirection,
            startTime:this.startTime,
            endTime:this.endTime
        }
        ApiManager.queryUserBill(req, data => {
            if(isLoadMore){
                const arrData=this.state.data
                arrData.push(...data)
                this.setState({data: arrData})
            }else {
                const empty=!data||data.length<=0
                this.setState({data: data,isEmpty:empty})
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
                    isEmpty={this.state.isEmpty}
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