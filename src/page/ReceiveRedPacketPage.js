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
            footerStatus: RefreshStatus.IDLE,
            resultState: false,
        }
    }

    componentWillMount() {
        this._handleRefresh();
    }

    render() {
        return (
            <View style={styles.container}>
                {/*标题栏*/}
                <Header
                    rightIconStyle={{width: 20, height: 20, resizeMode: "cover"}}
                    rightIcon={img_question}
                    onRightPress={this._handleRightArrowClick.bind(this)}
                    navigation={this.props.navigation}
                    title='领红包'/>
                {/*消息列表*/}
                <RefreshList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    footerStatus={this.state.footerStatus}/>
                <ReceiveRedPacketModal
                    action={RecivedRedPacket}
                    isShow={this.state.isShowProcess}/>
            </View>
        );
    }

    _handleRefresh = () => {
        ApiManager.getUserReceivableRedPacket({}, (data) => {
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
        ApiManager.getUserReceivableRedPacket(params, (data) => {
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

    handleShowProcess() {
        this.setState({
            isShowProcess: false
        });
    }

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