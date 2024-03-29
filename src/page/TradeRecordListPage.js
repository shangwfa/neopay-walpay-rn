import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import BankOrderListSectionHeader from '../components/BankOrderListSectionHeader'
import BankOrderListItem from '../components/BankOrderListItem'
import ApiManager from "../utils/ApiManager";
import DateUtils from "../utils/DateUtils";
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import {RouterPaths} from "../constants/RouterPaths";
import FormatUtils from "../utils/FormatUtils";
import TransactionTypeDescUtils from "../utils/TransactionTypeDescUtils";

class TradeRecordListPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pageType: this.props.navigation.state.params.pageType,
            title: '',
            cardId: this.props.navigation.state.params.cardId,
            isEmpty: false
        }
    }

    componentDidMount() {
        this._handleCurrentPageType();
    }

    render() {
        return (
            <View style={styles.container}>

                <Header navigation={this.props.navigation} title={this.state.title}/>
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this.renderRow}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                    extraData={this.state}
                    isEmpty={this.state.isEmpty}
                />
            </View>
        );
    }

    renderRow = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <BankOrderListItem
                    onPress={this._handleItemClick.bind(this, item)}
                    orderAvatar={item.iconUrl}
                    middleUpValue={item.title}
                    middleBottomValue={DateUtils.dateFmt("MM-dd HH:mm", new Date(item.tradeTimeMs))}
                    rightUpValue={TransactionTypeDescUtils._handleAmountType(item.payDirection) + FormatUtils.money(item.amount)}
                    rightBottomValue={item.balance}
                    isLine={true}/>
            </View>
        )
    };

    renderSectionHeader = (item) => {
        if (item.disPlayDate) {
            return <BankOrderListSectionHeader
                title={DateUtils.yyyyYearMmMonth(item.tradeTimeMs)}
                value={`收入:+${FormatUtils.money(item.incomeMoney)}元  支出:-${FormatUtils.money(item.outMoney)}元`}/>
        }
    };
    onLoadMore = (pageSize) => {
        let params = {
            pageNo: pageSize,
            cardId: this.state.cardId ? this.state.cardId : ''
        };
        switch (this.state.pageType) {
            case 0://余额
                ApiManager.getBalanceRecordList(params, (data) => {
                    if (data) {
                        let allData = this.state.dataSource;
                        allData.push(...data);
                        this.setState({
                            dataSource: allData,
                        });
                    }
                });
                break;
            case 1://银行卡
                ApiManager.getBankCardRecordPage(params, (data) => {
                    if (data) {
                        let allData = this.state.dataSource;
                        allData.push(...data);
                        this.setState({
                            dataSource: allData,
                        });
                    }
                });
                break
        }

    };
    onRefresh = () => {
        this._handleCurrentPageType();
    };
    _handleItemClick = (item) => {
        nav.navigate(RouterPaths.TRANSACTION_DETAILS, {orderNo: item.orderNo})
    };

    _handleCurrentPageType = () => {
        let txtContent;
        let params = {
            pageNo: 1,
            cardId: this.state.cardId ? this.state.cardId : ''
        }
        switch (this.state.pageType) {
            case 0://余额
                ApiManager.getBalanceRecordList(params, (data) => {
                    const empty = !data || data.length <= 0
                    this.setState({
                        dataSource: data,
                        isEmpty: empty
                    });
                });
                txtContent = '余额交易记录';
                break;
            case 1://银行卡
                ApiManager.getBankCardRecordPage(params, (data) => {
                    const empty = !data || data.length <= 0
                    this.setState({
                        dataSource: data,
                        isEmpty: empty
                    });
                });
                txtContent = '银行卡交易记录';
                break;
        }

        this.setState({title: txtContent})
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

export default TradeRecordListPage //余额交易记录、银行卡交易记录