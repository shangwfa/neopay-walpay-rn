/**
 * @author: carlos.guo
 * @data:  2017/10/23.
 * @description: 商户红包列表--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet, ListView, View, Text, Image, RefreshControl, FlatList, TouchableOpacity,
} from 'react-native'
import Header from "../components/Header";
import BasePage from "./BasePage";
import {RouterPaths} from "../constants/RouterPaths";
import ApiManager from "../utils/ApiManager";
import {SwRefreshListView} from "react-native-swRefresh";
import RedPacketTypeComponent from "../components/RedPacketTypeComponent";
import {RefreshStatus} from "../components/RefreshList";
import RefreshList from "../components/RefreshList";

class MerchantRedPacketPage extends BasePage {

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

    render() {
        return (
            <View style={styles.container}>
                {/*消息列表*/}
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    footerStatus={this.state.footerStatus}
                />
            </View>
        );

    }

    _handleRefresh = () => {
        ApiManager.getRedPacketList({}, (data) => {
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
        ApiManager.getRedPacketList(params, (data) => {
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
    _clickItem = (item) => {
        // 红包详情跳转
        this.props.navigation.navigate(RouterPaths.TRANSACTION_DETAILS, {packetCode: item.packetCode});
    };
    _renderItem = ({item}) => {

        return (
            <TouchableOpacity
                activeOpacity={0.8} onPress={this._clickItem.bind(this, item)}>
                <View style={[styles.red_container, {marginTop: 20}]}>
                    <RedPacketTypeComponent
                        redPacketData={item}/>
                </View>
            </TouchableOpacity>
        );
    };
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

export default MerchantRedPacketPage