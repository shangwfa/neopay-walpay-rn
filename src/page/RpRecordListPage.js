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
import {RouterPaths} from '../constants/RouterPaths'
import ApiManager from '../utils/ApiManager'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import DateUtils from "../utils/DateUtils";
import FormatUtils from "../utils/FormatUtils";

class RpRecordListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isEmpty: false
        }
    }

    componentDidMount() {
        this.getRpRecordList(1,false,true)
    }

    onRefresh = () => {
        this.getRpRecordList(1, false)
    }

    onLoadMore = (page) => {
        this.getRpRecordList(page, true)
    }

    getRpRecordList =(pageNo,isLoadMore,isLoadding=false)=>{

        let body={
            pageNo: pageNo,
            redpTradeQueryType:this.props.navigation.state.params.QueryType
        }

        ApiManager.getRedPacketRecord(body, data => {
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

    goRpDetail=(item)=>{
        this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, {packetCode:item.tradeObject,type:item.tradeType == 18?1:2});
    }


    renderRow = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title} middleBottomValue={DateUtils.mmDdHhMmDateFmt(item.createTimeMs)}
                               rightUpValue={item.payDirection==2?'-' + FormatUtils.money(item.amount):'+' + FormatUtils.money(item.amount)} rightBottomValue={item.status}
                               isLine={true}
                               imgIconUrl={item.bestFlag==1?require("../res/img/rp_max_num.png"):' '}
                               onPress={()=>this.goRpDetail(item)}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.displayDate) {
            return <SectionHeader title={DateUtils.getRpRecordList(item.createTimeMs)} value='查看月红包' onPress ={()=>this.pushMontnDetailPage(item)}/>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={this.getTitle()}/>
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this.renderRow}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    isEmpty={this.state.isEmpty}
                />
            </View>
        );
    }

    pushMontnDetailPage =(item)=> {
        this.props.navigation.navigate(RouterPaths.RP_MONTH_DETAILRECORD,item)
    }

    getTitle=()=>{
        if(this.props.navigation.state.params.QueryType===1){
            return '发出大红包明细';
        }else if(this.props.navigation.state.params.QueryType ==2){
            return '收到大红包明细';
        }else {
            return '红包交易明细';
        }
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

export default RpRecordListPage