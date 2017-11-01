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

class RedListPage extends BasePage {

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
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='红包来了！'/>
                {/*消息列表*/}
                <SwRefreshListView
                    style={{backgroundColor: "red"}}
                    ref='SwRefreshListView'
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                />
            </View>
        );

    }

    _onRefresh = () => {
        console.log("_onRefresh");
        end();//刷新成功后需要调用end结束刷新
    };
    _onLoadMore = () => {
        console.log("_onLoadMore");
        this.refs.listView.resetStatus(); //重置上拉加载的状态
        end(this._page > 2)//刷新成功后需要调用end结束刷新
    };
    _clickItem = (item) => {
        // 红包详情跳转
        this.props.navigation.navigate(RouterPaths.TRANSACTION_DETAILS, {info: item.packetCode});
    };
    _renderItem = (item) => {
        let isShow = item.disPlayDate;
        return (
            <TouchableOpacity
                style={{backgroundColor: "blue"}}
                activeOpacity={0.8} onPress={this._clickItem.bind(this, item)}>
                <View style={[styles.red_container, {backgroundColor: "yellow", marginTop: 20}]}>
                    <View style={[styles.time_container, {height: isShow ? 40 : 10}]}>
                        {isShow ? (<Text style={[styles.time]}>{item.createTimeMs}</Text>) : (null)}
                    </View>
                    <View >
                        <Image
                            style={styles.img}
                            source={{uri: item.themeUrl}}>
                            {this._renderTypeView(item)}
                        </Image>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    //渲染那种类型的红包
    _renderTypeView = (item) => {
        switch (item.receiveStatus) {
            case 1:
                return this._renderRobRedPacketView(item);
                break;
            case 2:
                return this._renderOverdueRedPacketView(item);
                break;
            case 3:
                return this._renderGeneralRedPacketView(item);
                break;

        }
    };

    /*待抢红包--类型*/
    _renderRobRedPacketView = (item) => {
        let isTheme = true;
        return <View style={{marginLeft: 97}}>
            <Text style={[isTheme ? styles.message : styles.message_general, {fontSize: 17}]}>{item.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 23, paddingLeft: 5}]}>
                <View style={[styles.line]}/>
                <Text
                    style={[isTheme ? styles.message : styles.message_general, {fontSize: 14,}]}>来自{item.bossName}的红包</Text>
            </View>

        </View>;
    };
    /*红包过期/已领完--类型*/
    _renderOverdueRedPacketView = (item) => {
        return <View style={{marginLeft: 76}}>
            <Text style={[styles.message, {fontSize: 14}]}>{item.message}</Text>
            <Text style={[styles.message, {fontSize: 17, paddingLeft: 22, marginTop: 48}]}>啊哦，这个红包过期了~</Text>
            <View style={[styles.message_from_container, {paddingLeft: 22, marginTop: 17}]}>
                <View style={[styles.line]}/>
                <Text style={[styles.message, {fontSize: 14}]}>来自{item.bossName}的红包</Text>
            </View>
        </View>;
    };
    /*普通红包--类型*/
    _renderGeneralRedPacketView = (item) => {
        return <View style={{marginLeft: 97}}>
            <Text style={[styles.message_general, {fontSize: 27, paddingLeft: 33}]}>$898.78</Text>
            <Text style={[styles.message, {fontSize: 17, marginTop: 18}]}>{item.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 16}]}>
                <View style={[styles.line]}/>
                <Text style={[styles.message, {fontSize: 14}]}>来自{item.bossName}的红包</Text>
            </View>
        </View>;
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
    img: {
        width: 350,
        height: 155,
        resizeMode: "cover",
        justifyContent: 'center',
    },
    message: {
        color: "#FBDEB0",
    },
    message_general: {
        color: "#FFFFFF",
    },
    message_from_container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 0,
    },
    line: {
        width: 31,
        height: 1,
        backgroundColor: "#FBDEB0"
    }
});

export default RedListPage