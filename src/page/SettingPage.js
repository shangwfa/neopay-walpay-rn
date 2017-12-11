import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    NativeModules
} from 'react-native'
import BasePage from '../page/BasePage'
import Header from '../components/Header'
import {colors} from '../constants/index'
import CommonKeyValueItem from '../components/CommonKeyValueItem'
import CommonButton from '../components/CommonButton'
import {RouterPaths} from '../constants/RouterPaths'
import TwoButtonModal from "../modal/TwoButtonModal";
import ApiManager from "../utils/ApiManager";

class SettingPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            isShowLogout: false,
        }
    }

    toLoginPwd = () => {
        const params = {page: 'resetLoginPwd'}
        NativeModules.commModule.jumpToNativePage('normal', JSON.stringify(params))
    }
    toPayPwd = () => {
        const params = {page: 'resetPayPwd'}
        NativeModules.commModule.jumpToNativePage('normal', JSON.stringify(params))
    }
    toFeedback = () => {
        this.props.navigation.navigate(RouterPaths.FEEDBACK_PAGE)
    }
    toLogout = () => {
        this.setState({
            isShowLogout: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='设置'/>
                <CommonKeyValueItem title='重置登录密码' isLine={true} isArrow={true} style={{marginTop: 10}}
                                    onPress={() => this.toLoginPwd()}/>
                <CommonKeyValueItem title='重置支付密码' isLine={false} isArrow={true} onPress={() => this.toPayPwd()}/>
                <CommonKeyValueItem title='意见反馈' isLine={false} isArrow={true} style={{marginTop: 10}}
                                    onPress={() => this.toFeedback()}/>
                <CommonButton value='退出登录' style={{marginTop: 50}} onPress={() => this.toLogout()}/>
                <TwoButtonModal
                    isShow={this.state.isShowLogout}
                    content={`\n确定退出登录\n`}
                    oneBtnText="关闭弹窗"
                    twoBtnText="确定退出"
                    onePress={this.handleCloseClick}
                    twoPress={this.handleExitClick}
                />
            </View>
        );
    }

    handleCloseClick = () => {
        this.setState({
            isShowLogout: false
        })
    };
    handleExitClick = () => {
        ApiManager.logoutUser({}, (data) => {
            NativeModules.commModule.closeRNPage();
            NativeModules.commModule.jumpToLoginPage();
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default SettingPage