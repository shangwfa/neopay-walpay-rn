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
import ApiManager from "../utils/ApiManager";

class TradeRecordListPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            page: 0,
            pageType: this.props.navigation.state.params.pageType,
            title:''
        }
    }

    componentWillMount() {
        this._handleCurrentPageType();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={this.state.title}/>
                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    ref="swRefreshListView"
                    renderRow={this.renderRow}
                    onRefresh={this.onRefresh}
                    onLoadMore={this.onLoadMore}
                />
            </View>
        );
    }

    renderRow = (item) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <BankOrderListItem
                    onPress={this._handleItemClick.bind(this, item)}
                    orderAvatar={item.iconUrl}
                    middleUpValue={item.title}
                    middleBottomValue={item.tradeTimeMs}
                    rightUpValue={item.amount}
                    rightBottomValue={item.balance}
                    isLine={true}/>
            </View>
        )
    };

    renderSectionHeader = (item) => {
        if (item.disPlayDate) {
            return <BankOrderListSectionHeader
                title={item.tradeTimeMs}
                value={"收入:" + item.incomeMoney + "元  " + "支出:" + item.outMoney + "元"}/>
        }
    };
    onLoadMore = (end) => {
        console.log("_onLoadMore");
        this.refs.swRefreshListView.resetStatus(); //重置上拉加载的状态
        end(this._page > 2);//刷新成功后需要调用end结束刷新
    };
    onRefresh = (end) => {
        console.log("_onRefresh");
        end()//刷新成功后需要调用end结束刷新
    };
    _handleItemClick = (item) => {
        alert(item.title);
    };

    _handleCurrentPageType = () => {
        switch (this.state.pageType) {
            case 0://余额
                ApiManager.getBalanceRecordList({}, (data) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data),
                    });
                });
                this.setState({title:'余额交易记录'})
                break;
            case 1://银行卡
                ApiManager.getBankCardRecordPage({}, (data) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data),
                    });
                });
                this.setState({title:'银行卡交易记录'})
                break;

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

export default TradeRecordListPage //余额交易记录、银行卡交易记录