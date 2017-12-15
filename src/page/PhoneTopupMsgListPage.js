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
import MsgCell from  '../components/PhoneTopupMsgCell'
import ApiManager from '../utils/ApiManager'
import DateUtils from '../utils/DateUtils'
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import {
    SwRefreshListView,
} from 'react-native-swRefresh'


class PhoneTopupMsgListPage extends BasePage {

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
        ApiManager.getPhoneTopupMsg({}, (data) => {
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
        ApiManager.getPhoneTopupMsg(params, (data) => {
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
        console.log(item)
        return (
            <View>
                <MsgCell
                    isShow = {item.disPlayDate}
                    showDate = {DateUtils.getPhoneTopupMsgDate(item.createTimeMs)}
                    dateValue = {item.updateTime}
                    topupTypeValue = {item.content}
                    priceValue = {item.amount}
                    topupPhoneNum = {item.phone}
                    payType = {item.payTypeDesc}
                    relustTilte = {item.title}/>
            </View>
        )

    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='手机充值' />
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
        backgroundColor: colors.page_background,
        alignItems:'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    top:{
        marginTop:15
    }
});

export default PhoneTopupMsgListPage