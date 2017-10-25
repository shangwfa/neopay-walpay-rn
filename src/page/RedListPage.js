/**
 * @author: carlos.guo
 * @data:  2017/10/23.
 * @description: 红包列表--组件
 */
import React, {Component} from 'react'
import {
    StyleSheet, View, Text, Image, RefreshControl, FlatList, TouchableOpacity,
} from 'react-native'
import Header from "../components/Header";
import BasePage from "./BasePage";
import LoadMoreFooter from "../components/LoadMoreFooter";
import NetUtil from "../utils/NetUtil";
import {APIS} from "../constants/API";
class RedListPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            isLoadMoreEnd: false
        }
    }

    componentWillMount() {
        //请求数据
        NetUtil.post(APIS.QUERY_RECENT_RED_PACKET_LIST, {}, (data) => {
            this.setState({
                sourceData: data,
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header navigation={this.props.navigation} title='红包来了！'/>
                {/*消息列表*/}
                <FlatList
                    ref='FlatList'
                    ListFooterComponent={<LoadMoreFooter isShow={true} isEnd={this.state.isLoadMoreEnd}/>}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    data={this.state.sourceData}
                    refreshing={false}
                    onRefresh={this._onRefresh}
                    onEndReached={this._onLoadMore}
                    onEndReachedThreshold={0.5}
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return index;
    };
    _onRefresh = () => {
        console.log("_onRefresh");
    };
    _onLoadMore = () => {
        console.log("_onLoadMore");
    };
    _clickItem = (item, index) => {
        alert(index + "=" + item.message);
    };
    _renderItem = ({item, index}) => {
        let isShow = true;
        return (
            <TouchableOpacity key={index} activeOpacity={0.8} onPress={this._clickItem.bind(this, item, index)}>
                <View style={styles.red_container}>
                    <View style={[styles.time_container, {height: isShow ? 40 : 10}]}>
                        {isShow ? (<Text style={[styles.time]}>{item.updateTime}</Text>) : (null)}
                    </View>
                    <View >
                        <Image
                            style={styles.img}
                            source={{uri: item.imageUrl}}>
                            {this._renderTypeView({item})}
                        </Image>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    //渲染那种类型的红包
    _renderTypeView = ({item}) => {
        switch (item.packetType) {
            case 1:
                return this._renderRobRedPacketView({item});
                break;
            case 2:
                return this._renderOverdueRedPacketView({item});
                break;
            case 3:
                return this._renderGeneralRedPacketView({item});
                break;

        }
    };

    /*待抢红包--类型*/
    _renderRobRedPacketView = ({item}) => {
        let isTheme = true;
        return <View style={{marginLeft: 97}}>
            <Text style={[isTheme ? styles.message : styles.message_general, {fontSize: 17}]}>{item.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 23, paddingLeft: 5}]}>
                <View style={[styles.line]}/>
                <Text
                    style={[isTheme ? styles.message : styles.message_general, {fontSize: 14,}]}>来自{item.origin}的红包</Text>
            </View>

        </View>;
    };
    /*红包过期/已领完--类型*/
    _renderOverdueRedPacketView = ({item}) => {
        return <View style={{marginLeft: 76}}>
            <Text style={[styles.message, {fontSize: 14}]}>{item.message}</Text>
            <Text style={[styles.message, {fontSize: 17, paddingLeft: 22, marginTop: 48}]}>啊哦，这个红包过期了~</Text>
            <View style={[styles.message_from_container, {paddingLeft: 22, marginTop: 17}]}>
                <View style={[styles.line]}/>
                <Text style={[styles.message, {fontSize: 14}]}>来自{item.origin}的红包</Text>
            </View>
        </View>;
    };
    /*普通红包--类型*/
    _renderGeneralRedPacketView = ({item}) => {
        return <View style={{marginLeft: 97}}>
            <Text style={[styles.message_general, {fontSize: 27, paddingLeft: 33}]}>$898.78</Text>
            <Text style={[styles.message, {fontSize: 17, marginTop: 18}]}>{item.message}</Text>
            <View style={[styles.message_from_container, {marginTop: 16}]}>
                <View style={[styles.line]}/>
                <Text style={[styles.message, {fontSize: 14}]}>来自{item.origin}的红包</Text>
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