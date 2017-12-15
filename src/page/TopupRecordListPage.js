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
import {
    SwRefreshListView,
} from 'react-native-swRefresh'

class TopupRecordListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            footerStatus: RefreshStatus.IDLE,
        };
    }

    componentWillMount() {
        this._handleRefresh();
    }

    _handleRefresh = () => {
        ApiManager.getPhoneTopupRecordList({}, (data) => {
            this.setState({
                dataSource: data,
            });
        });
    };

    _onRefresh = () => {
        this._handleRefresh();
    };

    _onLoadMore = (pageSize) => {
        let params = {
            pageSize: pageSize
        };
        ApiManager.getPhoneTopupRecordList(params, (data) => {
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

    _renderRow = ({item}) => {
        return (
            <View>
                {this.renderSectionHeader(item)}
                <CommonItemTwo imgUrl={item.iconUrl}
                               middleUpValue={item.title} middleBottomValue={DateUtils.mmDdHhMmDateFmt(item.createTimeMs)}
                               rightUpValue={'-' + item.amount} rightBottomValue={item.status}
                               isLine={true}/>
            </View>
        )

    }
    renderSectionHeader = (item) => {
        if (item.disPlayDate) {
            return <SectionHeader title={DateUtils.getRpRecordList(item.createTimeMs)} value={'支出:-' + item.outMoney} isShowArrow={false}/>
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='充值记录' onRightPress={() => {
                    this.props.navigation.navigate(RouterPaths.FILTER_PAGE)
                }}/>
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderRow}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
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

export default TopupRecordListPage