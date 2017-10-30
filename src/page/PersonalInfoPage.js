import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    NativeModules,
    DeviceEventEmitter
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import Header from '../components/Header'
import CommonKeyValueItem from '../components/CommonKeyValueItem'
import {RouterPaths} from '../constants/RouterPaths'
import FormatUtils from '../utils/FormatUtils'
import NetUtil from '../utils/NetUtil'
import {events} from '../constants/index'

class PersonalInfoPage extends BasePage {

    constructor() {
        super()
        this.state = {
            data:{
                avatarUrl:'http://pic2.ooopic.com/12/22/94/37bOOOPICc7_1024.jpg',
                nickName:'胡萝卜',
                phone:'',
                authStatus:'1'
            }
        }
    }

    componentWillMount() {
        this.userInfo()
        this.updatePhotoListener()
        this.updatePageListener()
    }

    updatePageListener=()=>{
        DeviceEventEmitter.addListener(events.UPDATE_PERSONAL_INFO_PAGE_EVENT, () => {
            this.userInfo()
        })
    }

    updatePhotoListener=()=>{
        DeviceEventEmitter.addListener('updateHeadImg', (imgUrl) => {
            this.setState({
                data:{...data,avatarUrl:imgUrl}
            })
        })
    }
    userInfo=()=>{
        NetUtil.post('user/get_user_info', {}, (data) => {
            this.setState({
                data: data
            })
        })
    }

    renderRealNameItem=()=>{
        switch (this.state.data.authStatus){
            case 1:
                return <CommonKeyValueItem  title='实名认证'   realNameValue='前往实名'  isLine={true} isArrow={true} onPress={()=>{
                    this.props.navigation.navigate(RouterPaths.BIND_BANK_CARD_PAGE)
                }}/>
                break
            case 2:
                return <CommonKeyValueItem  title='实名认证'    isLine={true} isArrow={true} onPress={()=>{}}/>
                break
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='个人信息'/>
                <View style={{height:10}}/>
                <CommonKeyValueItem  title='头像'   imgUrl={this.state.data.avatarUrl} isLine={true} isArrow={true} onPress={()=>{
                    NativeModules.commModule.showCommDialog('updatePersonalAvatar', () => {
                    })
                }}/>
                <CommonKeyValueItem  title='昵称'   value={this.state.data.nickName}  isLine={true} isArrow={true} onPress={()=>{
                    this.props.navigation.navigate(RouterPaths.CHANGE_NAME_PAGE)
                }}/>
                {this.renderRealNameItem()}
                <CommonKeyValueItem  title='新光钱包账号'   value={FormatUtils.tuoMinPhone(this.state.data.phone)}   />
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