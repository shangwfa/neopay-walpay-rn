import React, {Component} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    NativeModules,
    DeviceEventEmitter
} from 'react-native';

import Header from "../components/Header"
import colors from '../constants/colors'
import MineTopView from '../components/MineTopView'
import CommonItemOne from '../components/CommonItemOne'
import Divider from '../components/Divider'
import NetUtil from '../utils/NetUtil'
import {RouterPaths} from '../constants/RouterPaths'
import BasePage from './BasePage'
import {events} from '../constants/index'

class Home extends BasePage {

    constructor() {
        super()
        this.state = {
            data: {}
        }
    }


    componentWillMount() {
        console.log(this.props)
        // NetUtil.postJson('employee/get_employee_info', {}, (data) => {
        //     this.setState({
        //         data: data
        //     })
        // })
    }

    /**
     * 接收原生调用
     */
    componentDidMount() {
        DeviceEventEmitter.addListener('updateHeadImg', (imgUrl) => {
            // let data = this.state.data
            // data.headImgUrl = imgUrl
            // this.setState({data: data})
            this.setState({
                data:{...data,headImgUrl:imgUrl}
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='我的'/>
                <ScrollView contentContainerStyle={styles.scroller}>
                    <MineTopView imgUrl={this.state.data.headImgUrl} onPress={() => this.onUpdateHeadImg()}/>

                    <Divider style={{backgroundColor: colors.page_background, height: 10}}/>
                    <CommonItemOne name='账号' value={this.state.data.phone}/>
                    <Divider style={{backgroundColor: colors.page_background, marginLeft: 10}}/>
                    <CommonItemOne name='昵称' value={this.state.data.nickname} isShowArrow={true}
                                   onPress={() => this.onToChangeNickName()}/>

                    <Divider style={{backgroundColor: colors.page_background, height: 10}}/>
                    <CommonItemOne name='修改登录密码' isShowArrow={true} onPress={() => this.onToChangeLoginPassWord()}/>
                    <Divider style={{backgroundColor: colors.page_background, marginLeft: 10}}/>
                    <CommonItemOne name='设置支付密码' isShowArrow={true} onPress={() => this.onToChangePayPassWord()}/>
                </ScrollView>
            </View>
        )
    }

    onUpdateHeadImg = () => {
        DeviceEventEmitter.emit(events.MODAL_TYPE_EVENT,events.DEMO_MODAL_EVENT); //显示弹窗
        // NativeModules.commModule.showCommDialog('updateHeadImg', () => {
        // })
    }
    onToChangePayPassWord = () => {
        this.props.navigation.navigate(RouterPaths.PERSONAL_INFO_PAGE)
    }

    onToChangeLoginPassWord = () => {
        this.props.navigation.navigate(RouterPaths.MY_ORDER_PAGE)
    }
    onToChangeNickName = () => {
        this.props.navigation.navigate(RouterPaths.SETTING_PAGE)
    }
    onExit = () => {
        NativeModules.commModule.showCommDialog('exitApp', () => {
        })
    }

}

const styles = StyleSheet.create({
    button_text: {
        fontSize: 15, color: colors.white
    },
    button: {
        height: 48,
        backgroundColor: colors.one_color,
        borderColor: colors.one_color,
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
    },
    scroller: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },

});

export default Home