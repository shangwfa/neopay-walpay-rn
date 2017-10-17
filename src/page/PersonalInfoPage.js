import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import BasePage from './BasePage'
import {colors} from '../constants/index'
import {Header,CommonKeyValueItem} from '../components/index'
import * as RouterPaths from '../constants/RouterPaths'
import FormatUtils from '../utils/FormatUtils'

class PersonalInfoPage extends BasePage {

    static defaultProps = {
        userInfo:{
            phone:'15958199303',
            authStatus:'1',
            avatarUrl:'http://pic2.ooopic.com/12/22/94/37bOOOPICc7_1024.jpg',
            name:'小门',
            nickName:'胡萝卜',

        }
    }

    render() {
        const userInfo=this.props.userInfo
        const dataList = [
            {title: '头像', value: '', realNameValue: '', imgUrl: userInfo.avatarUrl, isLine: true, isArrow: true, onPress: () => {
                //TODO 更换头像
            }},
            {title: '昵称', value: userInfo.nickName, realNameValue: '', imgUrl: '', isLine: true, isArrow: true, onPress: () => {
                this.props.navigation.navigate(RouterPaths.CHANGE_NAME_PAGE)
            }},
            {title: '实名认证', value: '', realNameValue: '前往实名', imgUrl: '', isLine: true, isArrow: true, onPress: () => {

            }},
            {title: '新光钱包账号', value: FormatUtils.tuoMinPhone(userInfo.phone), realNameValue: '', imgUrl: '', isLine: false, isArrow: false, },
        ]
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='个人信息'/>
                <View style={{height:10}}/>
                {
                    dataList.map(data=>{
                        return <CommonKeyValueItem title={data.title}  value={data.value} realNameValue={data.realNameValue} imgUrl={data.imgUrl} isLine={data.isLine} isArrow={data.isArrow} onPress={data.onPress}/>
                    })
                }
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