/**
 * @author: carlos.guo
 * @data:  2017/11/7.
 * @description: 领红包--页面
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
import img_question from "../res/img/img_question.png"
import BasePage from "./BasePage";
import ReceiveRedPacketModal from "../modal/ReceiveRedPacketModal";
class ReceiveRedPacketPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            page: 0,
            isShowProcess: true,
        }
    }

    componentWillMount() {
        ApiManager.getUserReceivableRedPacket({}, (data) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header
                    rightIconStyle={{width: 20, height: 20, resizeMode: "cover", marginRight: 13}}
                    rightIcon={img_question}
                    onRightPress={this._handleRightArrowClick.bind(this)}
                    navigation={this.props.navigation}
                    title='领红包'/>
                {/*消息列表*/}
                <SwRefreshListView
                    ref='listView'
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                />
                <ReceiveRedPacketModal
                    isShow={this.state.isShowProcess}
                />
            </View>
        );
    }

    _onRefresh = (end) => {
        console.log("_onRefresh");
        end();//刷新成功后需要调用end结束刷新
    };
    _onLoadMore = (end) => {
        console.log("_onLoadMore");
        this.refs.listView.resetStatus(); //重置上拉加载的状态
        end();//刷新成功后需要调用end结束刷新
    };
    _clickItem = (item) => {
        // this.setState({
        //     isShowProcess: true
        // });
        // setInterval(() => {
        //     this.setState({
        //         isShowProcess: false
        //     })
        // }, 5000)
    };
    _handleRightArrowClick = () => {
        alert("红包规则");
    };
    _renderItem = (item) => {
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

export default ReceiveRedPacketPage