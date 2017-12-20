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
import DateUtils from '../utils/DateUtils'
import FormatUtils from '../utils/FormatUtils'
import StringUtils from "../utils/StringUtils";
class MyOrderPage extends BasePage {
    queryType=''//订单类型
    payDirection=''//交易方向
    startTime=''//开始时间
    endTime=''//结束时间
    isResult=false

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isEmpty:false
        }

        if(this.props.navigation.state.params) {
            const {tradeType,incomeType,startTime,endTime,isResult}=this.props.navigation.state.params
            this.queryType=tradeType
            this.payDirection=incomeType
            this.startTime=startTime
            this.endTime=endTime
            this.isResult=isResult
        }
    }

    componentWillMount() {
        this.loadData(1,false,true)
    }

    emitEvent=(event)=>{
        this.queryType=event.data.tradeType
        this.payDirection=event.data.incomeType
        this.startTime=event.data.startTime
        this.endTime=event.data.endTime
        this.loadData(1,false)
    }

    loadData = (pageNo,isLoadMore,isLoadding=false) => {
        const req={

            pageNo: pageNo,
            queryType:this.queryType?this.queryType:"",
            payDirection:this.payDirection?this.payDirection:"",
            startTime:this.startTime?this.startTime:"",
            endTime:this.endTime?this.endTime:""
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


        },isLoadding)
    }
    renderItem = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title}
                               middleBottomValue={DateUtils.mmDdHhMmDateFmt(item.tradeTimeMs)}
                               rightUpValue={(item.payDirection==1?'+':'-')+FormatUtils.money(item.amount)}
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
            return <SectionHeader title={DateUtils.yyyyYearMmMonth(item.tradeTimeMs)} value='查看月账单'/>
        }
    }
    onRefresh = () => {
        this.loadData(1,false)
    }
    onLoadMore = (page) => {
        this.loadData(page,true)
    }

    renderHeader=()=>{
        if(this.isResult){
            return(<Header navigation={this.props.navigation} title='我的账单'/>)
        }else {
            return(
                <Header navigation={this.props.navigation} title='我的账单' rightTitle='筛选' onRightPress={() => {
                    this.props.navigation.navigate(RouterPaths.FILTER_PAGE)
                }}/>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
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