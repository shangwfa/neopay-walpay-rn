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
import {RouterPaths} from '../constants/RouterPaths'
import ApiManager from '../utils/ApiManager'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class RpRecordListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            footerStatus: RefreshStatus.IDLE,
        }
    }

    componentWillMount() {
        this._handleRefresh();
    }

    _handleRefresh = () => {
        //采用变量传递网络参数的时候,无法获取到相应参数,很奇怪
        ApiManager.getRedPacketRecord({pageSize:10,redpTradeQueryType:this.props.navigation.state.params.QueryType}, (data) => {
            this.setState({
                dataSource: data,
            });
        });
    };

    _onRefresh = () => {
        this._handleRefresh();
    };

    _onLoadMore = (pageSize) => {

        ApiManager.getRedPacketRecord({pageSize: pageSize,redpTradeQueryType:this.props.navigation.state.params.QueryType}, (data) => {
            if (data) {
                let allData = this.state.dataSource;
                allData.push(...data);
                this.setState({
                    dataSource: allData,
                });
            } else {
                this.setState({
                    footerStatus: RefreshStatus.END
                });
            }
        });
    };

    renderRow = ({item}) => {
        console.log('rop---' + item)
        return (
            <View>
                {this.renderSectionHeader(item)}
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title} middleBottomValue={item.tradeTime}
                               rightUpValue={item.amount} rightBottomValue={item.status}
                               isLine={true}
                               imgIconUrl={item.bestFlag==1?require("../res/img/rp_max_num.png"):' '}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.displayDate) {
            return <SectionHeader title={item.monthCode} value='查看月红包' onPress ={()=>this.pushMontnDetailPage(item)}/>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={this.getTitle()}/>
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this.renderRow}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    footerStatus={this.state.footerStatus}
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