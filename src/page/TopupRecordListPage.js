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
import DateUtils from "../utils/DateUtils";
import FormatUtils from "../utils/FormatUtils";
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class TopupRecordListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isEmpty: false,
        };
    }

    componentDidMount() {
        this._handleRefresh();
    }

    _handleRefresh = () => {
        this.loadData(1, false, true);
    };

    _onRefresh = () => {
        this._handleRefresh();
    };
    loadData = (pageNo, isLoadMore, isLoadding = false) => {
        let params = {
            pageNo: pageNo
        };
        ApiManager.getPhoneTopupRecordList(params, data => {
            if (isLoadMore) {
                const arrData = this.state.dataSource;
                arrData.push(...data);
                this.setState({dataSource: arrData});
            } else {
                const empty = !data || data.length <= 0;
                this.setState({dataSource: data, isEmpty: empty})
            }
        }, isLoadding)
    };
    _onLoadMore = (pageNo) => {
        this.loadData(pageNo, true, false);
    };

    _renderRow = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title}
                               middleBottomValue={DateUtils.mmDdHhMmDateFmt(item.createTimeMs)}
                               rightUpValue={'-' + FormatUtils.money(item.amount)} rightBottomValue={item.status}
                               isLine={true}
                               onPress={() => this.pressOnItem(item)}
                />
            </View>
        )

    }

    pressOnItem = (item) => {
        // console.log('点击了充值记录条目')
        nav.navigate(RouterPaths.TRANSACTION_DETAILS, {orderNo: item.orderNo});
    }

    renderSectionHeader = (item) => {
        if (item.disPlayDate) {
            return <SectionHeader title={DateUtils.getRpRecordList(item.createTimeMs)}
                                  value={'支出:-' + FormatUtils.money(item.outMoney)} isShowArrow={false}/>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='充值记录' onRightPress={() => {
                    // this.props.navigation.navigate(RouterPaths.FILTER_PAGE)
                }}/>
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
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

export default TopupRecordListPage