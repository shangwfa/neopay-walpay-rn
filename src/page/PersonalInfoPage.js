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
            dataList:[
                {title: '头像', value: '', realNameValue: '', imgUrl: 'http://pic2.ooopic.com/12/22/94/37bOOOPICc7_1024.jpg', isLine: true, isArrow: true, onPress: () => {
                    NativeModules.commModule.showCommDialog('updatePersonalAvatar', () => {
                    })
                }},
                {title: '昵称', value: '胡萝卜', realNameValue: '', imgUrl: '', isLine: true, isArrow: true, onPress: () => {
                    this.props.navigation.navigate(RouterPaths.CHANGE_NAME_PAGE)
                }},
                {title: '实名认证', value: '', realNameValue: '前往实名', imgUrl: '', isLine: true, isArrow: true, onPress: () => {

                }},
                {title: '新光钱包账号', value: FormatUtils.tuoMinPhone('15958199303'), realNameValue: '', imgUrl: '', isLine: false, isArrow: false, },
            ]
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('updateHeadImg', (imgUrl) => {
            let dataList=this.state.dataList
            dataList[0].imgUrl=imgUrl
            this.setState({
                dataList:dataList
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='个人信息'/>
                <View style={{height:10}}/>
                {
                    this.state.dataList.map(data=>{
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