/**
 * @author: carlos.guo
 * @data:  2017/10/23.
 * @description: 消息红包列表--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet, ListView, View, Text, Image, RefreshControl, FlatList, TouchableOpacity,
} from 'react-native'
import Header from "../components/Header";
import BasePage from "./BasePage";
import {RouterPaths} from "../constants/RouterPaths";
import ApiManager from "../utils/ApiManager";
import RedPacketTypeComponent from "../components/RedPacketTypeComponent";
import RefreshList from "../components/RefreshList";
import DateUtils from "../utils/DateUtils";
import ReceiveRedPacketModal from "../modal/ReceiveRedPacketModal";
import RecivedRedPacket from '../data/RecivedRedPacket.json'

class RedListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isShowProcess: false,
            isEmpty: false,
        }
    }

    componentDidMount() {
        this._handleRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='红包来了！'/>
                {/*消息列表*/}
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    extraData={this.state}
                    onLoadMore={this._onLoadMore}
                    isEmpty={this.state.isEmpty}
                />
                <ReceiveRedPacketModal
                    action={RecivedRedPacket}
                    isShow={this.state.isShowProcess}/>
            </View>
        );

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
        ApiManager.getRedPacketMessageList(params, data => {
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
    _onLoadMore = (pageSize) => {
        this.loadData(pageSize, true, false);
    };
    _clickItem = (item) => {
        let request = {
            packetCode: item.packetCode
        };
        if (item.readStatus === 2) {
            this.setState({
                isShowProcess: true
            });
            ApiManager.receiveRedPacket(request, (data) => {
                setTimeout(() => {
                    this.handleShowProcess();
                    this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, request);
                }, 2000);
            }, (errorData) => {//数据错误
                this.handleShowProcess();
            }, (errData) => {//网络超时
                this.handleShowProcess();
            });
        } else {
            this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, request);
        }
    }
    ;
    handleShowProcess = () => {
        this.setState({
            isShowProcess: false
        });
    };
    _renderItem = ({item}) => {
        let isShow = item.disPlayDate;
        return (
            <TouchableOpacity
                activeOpacity={0.8} onPress={this._clickItem.bind(this, item)}>
                <View style={[styles.red_container]}>
                    <View style={[styles.time_container, {height: isShow ? 40 : 10}]}>
                        {isShow ? (<Text
                            style={[styles.time]}>{DateUtils.getPhoneTopupMsgDate(item.createTimeMs)}</Text>) : (null)}
                    </View>
                    <RedPacketTypeComponent
                        redPacketData={item}/>
                </View>
            </TouchableOpacity>
        );
    };
    emitEvent = (event) => {
        switch (event.type) {
            case "redPacketDetailBack"://红包详情回退redPacketDetailBack
                this._handleRefresh();
                break;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    red_container: {
        marginLeft: 13,
        marginRight: 13,
        backgroundColor: '#F5F5F5',
    },
    time: {
        color: "#666666",
        fontSize: 16,
    },
    time_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    time_container_gone: {
        display: "none",
        marginBottom: 7,
    },
});

export default RedListPage