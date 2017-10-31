import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    NativeModules,
    DeviceEventEmitter
} from 'react-native';

import Header from "../components/Header"
import colors from '../constants/colors'
import CommonInput from '../components/CommonInput'
import CommonButton from '../components/CommonButton'
import NetUtil from '../utils/NetUtil'
import BasePage from './BasePage'
import events from "../constants/events";
import ApiManager from "../utils/ApiManager";

 class ChangeNamePage extends BasePage {
    constructor() {
        super()
        this.state = {
            inputText: ''
        }
    }

    render() {
        let inputData = {'key': '昵称', "placeholder": "请输入昵称(不能超过8个字)", limitlength: 8, limitTip: ''}
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='修改昵称'/>
                <View style={{height: 10}}/>
                <CommonInput data={inputData} onChangeText={(text) => this.onChangeText(text)}/>
                <CommonButton value='确定' style={{marginTop:50}} onPress={()=>this.onEnsure()}/>

            </View>
        );
    }

    onChangeText = (text) => {
        this.state = {
            inputText: text
        }
    }

    onEnsure = () => {
        let nickName = this.state.inputText
        console.log(this.state)
        if (nickName.length <= 0) {
            NativeModules.commModule.toast("昵称不能为空")
        }else {
            ApiManager.modifyUserNickName({nickName: nickName},data=>{
                this.props.navigation.goBack()
                DeviceEventEmitter.emit(events.UPDATE_PERSONAL_INFO_PAGE_EVENT)
            })
        }


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
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 2
    },
    input_container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    container: {
        flex: 1,
        backgroundColor: colors.page_background,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

});

export default ChangeNamePage