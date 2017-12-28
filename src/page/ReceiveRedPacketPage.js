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
    ListView, TouchableOpacity, NativeModules
} from 'react-native'
import ApiManager from "../utils/ApiManager";
import Header from "../components/Header";
import RedPacketTypeComponent from "../components/RedPacketTypeComponent";
import {RouterPaths} from "../constants/RouterPaths";
import img_question from "../res/img/img_question.png"
import BasePage from "./BasePage";
import ReceiveRedPacketModal from "../modal/ReceiveRedPacketModal";
import RefreshList, {RefreshStatus} from "../components/RefreshList";
import RecivedRedPacket from '../data/RecivedRedPacket.json'
class ReceiveRedPacketPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isShowProcess: false,
            resultState: false,
            isEmpty: false,
        }
    }

    componentWillMount() {
        this._handleRefresh();
    }
    emitEvent = (event) => {
        switch (event.type) {
            case "redPacketDetailBack"://红包详情回退redPacketDetailBack
                this._handleRefresh();
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header
                    rightIconStyle={{width: 20, height: 20, resizeMode: "contain"}}
                    rightIcon={img_question}
                    onRightPress={this._handleRightArrowClick.bind(this)}
                    navigation={this.props.navigation}
                    title='领红包'/>
                {/*消息列表*/}
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    isEmpty={this.state.isEmpty}/>
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
        ApiManager.getUserReceivableRedPacket(params, data => {
            if (isLoadMore) {
                const arrData = this.state.dataSource;
                arrData.push(...data);
                this.setState({dataSource: arrData});
            } else {
                const empty = !data || data.length <= 0
                this.setState({dataSource: data, isEmpty: empty})
            }
        }, isLoadding)
    };
    _onLoadMore = (pageSize) => {
        this.loadData(pageSize, true, false);
    };
    _clickItem = (item) => {
        this.setState({
            isShowProcess: true
        });
        let request = {
            packetCode: item.packetCode
        };
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

    };

    handleShowProcess = () => {
        this.setState({
            isShowProcess: false
        });
    };

    _handleRightArrowClick = () => {
        this.props.navigation.navigate(RouterPaths.INSTRUCTIONS_PAGE);
    };
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8} onPress={this._clickItem.bind(this, item)}>
                <View style={[styles.red_container]}>
                    <View style={[styles.time_container, {height: 10, backgroundColor: "#FFF"}]}/>
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