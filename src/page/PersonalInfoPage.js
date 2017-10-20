import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    NativeModules,
    DeviceEventEmitter
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import CommonKeyValueItem from '../components/CommonKeyValueItem'
import * as RouterPaths from '../constants/RouterPaths'
import FormatUtils from '../utils/FormatUtils'

class PersonalInfoPage extends BasePage {

    constructor() {
        super()
        this.state = {
            imgUrl:'http://pic2.ooopic.com/12/22/94/37bOOOPICc7_1024.jpg',
            nickName:'胡萝卜',
            phone:'15958199303'
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('updateHeadImg', (imgUrl) => {

        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='个人信息'/>
                <View style={{height:10}}/>
                <CommonKeyValueItem  title='头像'   imgUrl={this.state.imgUrl} isLine={true} isArrow={true} onPress={()=>{
                    NativeModules.commModule.showCommDialog('updatePersonalAvatar', () => {
                    })
                }}/>
                <CommonKeyValueItem  title='昵称'   value={this.state.nickName}  isLine={true} isArrow={true} onPress={()=>{
                    this.props.navigation.navigate(RouterPaths.CHANGE_NAME_PAGE)
                }}/>
                <CommonKeyValueItem  title='实名认证'   realNameValue='前往实名'  isLine={true} isArrow={true} onPress={()=>{}}/>
                <CommonKeyValueItem  title='新光钱包账号'   value={FormatUtils.tuoMinPhone(this.state.phone)}   />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    }
});

export default PersonalInfoPage