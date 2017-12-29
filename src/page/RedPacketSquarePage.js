/**
 * @author: carlos.guo
 * @data:  2017/11/7.
 * @description: 红包广场--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView, TouchableOpacity,
} from 'react-native'
import ApiManager from "../utils/ApiManager";
import Header from "../components/Header";
import {SwRefreshListView} from "react-native-swRefresh";
import RedPacketTypeComponent from "../components/RedPacketTypeComponent";
import {RouterPaths} from "../constants/RouterPaths";
import BasePage from "./BasePage";
import RefreshList, {RefreshStatus} from "../components/RefreshList";
class RedPacketSquarePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            footerStatus: RefreshStatus.IDLE
        };
    }

    componentDidMount() {
        this._handleRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='红包广场'/>
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

    _onRefresh = () => {
        this._handleRefresh();
    };
    _onLoadMore = (pageSize) => {
        let params = {
            pageSize: pageSize
        };
        ApiManager.getSquareRedPacketList(params, (data) => {
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
        this.props.navigation.navigate(RouterPaths.RP_DETAIL_PAGE, item);
    };
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8} onPress={this._clickItem.bind(this, item)}>
                <View style={[styles.red_container]}>
                    <View style={[styles.time_container, {height: 10}]}/>
                    <RedPacketTypeComponent
                        redPacketData={item}/>
                </View>
            </TouchableOpacity>
        );
    };
    _handleRefresh = () => {
        ApiManager.getSquareRedPacketList({}, (data) => {
            this.setState({
                dataSource: data,
            });
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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

export default RedPacketSquarePage