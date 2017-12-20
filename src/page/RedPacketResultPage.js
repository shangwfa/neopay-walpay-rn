import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native'
import {NavigationActions} from 'react-navigation'

import BasePage from '../page/BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import CommonBtn from '../components/CommonButton'
import ScreenUtils from '../utils/ScreenUtils'
import Divider from '../components/Divider'
import {RouterPaths} from "../constants/RouterPaths";
import FormatUtils from "../utils/FormatUtils";

const sizeRatioH = ScreenUtils.height / 667.0;

class RedPacketResultPage extends BasePage {

    // static defaultProps ={
    //     isReady:false,
    //     amount:0,
    //     value:0.00,
    //     bankId:0,
    //     bankName:'中信银行储蓄卡',
    //     bankNo:'123123123123',
    // };

    constructor(props) {
        super(props);
        this.state = {
            isReady: this.props.navigation.state.params.isReady
        };
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: '#F2F2F2'}]}>
                <Header navigation={this.props.navigation} title='发红包' onLeftPress={() => {
                    this.headerLeftBtnPress()
                }}/>
                {this.renderContent()}
                {this.renderBottom()}
            </View>
        );
    }

    headerLeftBtnPress = () => {
        DeviceEventEmitter.emit('sendRedPacket', {type: 'redPacketResultGoBack'})
        this.props.navigation.goBack();
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params);
    }

    renderContent = () => {
        return (
            <FlatList
                data={this.state.isReady ? [{
                    key: '领取人',
                    value: this.props.navigation.state.params.desMsg
                }, {key: '红包总价值', value: FormatUtils.money(this.props.navigation.state.params.amount)}, {
                    key: '付款方式',
                    value: this.props.navigation.state.params.payTypeDesc
                }] : [{key: '红包总价值', value: this.props.navigation.state.params.amount}, {
                    key: '付款方式',
                    value: this.props.navigation.state.params.payTypeDesc
                }]}
                renderItem={this.renderReadyCell}
                ListHeaderComponent={this.renderReadyHeader}
                ListFooterComponent={this.renderReadyFooter}
            />
        )
    };

    renderReadyCell = ({item}) => {
        return (
            <View>
                <View style={styles.readyCellView}>
                    <Text style={styles.readyCellName}>{item.key}</Text>
                    <View style={styles.readyCellSep}></View>
                    <Text style={styles.readyCellDes}>{item.value}</Text>
                </View>
                <Divider style={{marginLeft: 12}}/>
            </View>
        )
    }

    renderReadyHeader = () => {
        return (
            <View style={{backgroundColor: '#FFFFFF', alignItems: 'center', marginBottom: 9}}>
                <Image
                    source={this.state.isReady ? require('../res/img/HomePage/sy_fasong.png') : require('../res/img/HomePage/sy_shibai.png')}
                    style={{marginTop: 16}}/>
                <Text style={{
                    fontSize: 16,
                    color: this.state.isReady ? '#09BB07' : '#E94D3D',
                    marginTop: 14,
                    marginBottom: 23
                }}>{this.props.navigation.state.params.totalCount ? this.props.navigation.state.params.totalCount + '个' : ''}{this.state.isReady ? '发送成功' : '发送失败'}</Text>
            </View>
        )
    }

    renderReadyFooter = () => {
        if (this.state.isReady) {
            return (
                <View>
                    <CommonBtn style={{width: ScreenUtils.width, marginTop: 51 * sizeRatioH,}} value={'分享红包至微信领取'}/>
                </View>
            )
        } else {
            return (
                <View>
                    <CommonBtn style={{width: ScreenUtils.width, marginTop: 51 * sizeRatioH,}} value={'分享红包至微信领取'}/>
                    <CommonBtn style={{width: ScreenUtils.width, marginTop: 20 * sizeRatioH}}
                               backgroundColor={'#FFFFFF'}
                               textColor={'#CCCCCC'}
                               value={'重新发送'}
                               onPress={() => nav.navigate(RouterPaths.RED_PACKET_RECEIVER)}/>
                </View>
            )
        }
    }

    renderBottom = () => {
        return (
            <View style={{marginLeft: 13}}>
                <View style={{flexDirection: 'row', height: 20, alignItems: 'center', marginBottom: 20 * sizeRatioH}}>
                    <Image source={require('../res/img/HomePage/sy_hongbao2.png')}/>
                    <Text style={{fontSize: 15, color: '#333333', marginLeft: 5}}>红包领取攻略</Text>
                </View>
                <View>
                    <Text style={{marginBottom: 13 * sizeRatioH, fontSize: 13, color: '#999999'}}>
                        1. 添加制定领取人，ta将收到红包消息、短信提醒
                    </Text>
                    <Text style={{marginBottom: 20 * sizeRatioH, fontSize: 13, color: '#999999'}}>
                        2. 或可将该红包分享至微信，方便领取
                    </Text>
                </View>
            </View>
        )
    }

    //点击重新包一下按钮
    reloadRedPacket = () => {
        DeviceEventEmitter.emit('sendRedPacket', {type: 'redPacketResultRePay'});
        nav.dispatch(NavigationActions.back());
        console.log('红包页点击返回');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    failedView: {
        alignItems: 'center',
        width: ScreenUtils.width,
    },
    failedIcon: {
        marginTop: 16,

    },
    failedText1: {
        marginTop: 14,
        fontSize: 16,
        color: '#E94D3D',
    },
    failedText2: {
        marginTop: 19,
        fontSize: 14,
        color: '#999999',
    },
    failedBtn: {
        marginTop: 49,
        width: ScreenUtils.width,
    },

    readyCellView: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    readyCellName: {
        marginLeft: 12,
        fontSize: 14,
        color: '#333333',
    },
    readyCellSep: {
        flex: 1,
    },
    readyCellDes: {
        marginRight: 12,
        fontSize: 14,
        color: '#666666'
    }
});

export default RedPacketResultPage