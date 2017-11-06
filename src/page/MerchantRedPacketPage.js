/**
 * @author: carlos.guo
 * @data:  2017/10/23.
 * @description: 红包列表--页面
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

class MerchantRedPacketPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            page: 0,
        };
    }

    componentWillMount() {
        ApiManager.getRedPacketList({}, (data) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/*消息列表*/}
                <SwRefreshListView
                    ref='SwRefreshListView'
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                />
            </View>
        );

    }

    _onRefresh = (end) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            end()//刷新成功后需要调用end结束刷新
        }, 1500)
    };
    _onLoadMore = (end) => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.refs.SwRefreshListView.resetStatus() //重置上拉加载的状态
            end(this._page > 2)//刷新成功后需要调用end结束刷新
        }, 1500)
    };
    _clickItem = (item) => {
        // 红包详情跳转
        this.props.navigation.navigate(RouterPaths.TRANSACTION_DETAILS, {info: item.packetCode});
    };
    _renderItem = (item) => {

        return (
            <TouchableOpacity
                activeOpacity={0.8} onPress={this._clickItem.bind(this, item)}>
                <View style={[styles.red_container, {backgroundColor: "yellow", marginTop: 20}]}>
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