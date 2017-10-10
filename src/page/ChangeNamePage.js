import React, {Component} from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    NativeModules
} from 'react-native';

import Header from "../components/Header"
import colors from '../constants/colors'
import CommonInput from '../components/CommonInput'
import TextWithLeftImge from '../components/TextWithLeftImge'
import asterisk from '../res/img/asterisk.png'
import Button from 'apsl-react-native-button'
import NetUtil from '../utils/NetUtil'

 class ChangeNamePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super()
        this.state = {
            inputText: ''
        }
    }

    componentWillMount() {
        console.log(this.props)

    }

    render() {
        let inputData = {'key': '昵称', "placeholder": "请输入昵称", limitlength: 8, limitTip: '', keyboard: 'numeric'}
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'default'}/>
                <Header navigation={this.props.navigation} title='修改昵称'/>
                <CommonInput data={inputData} onChangeText={(text) => this.onChangeText(text)}/>
                <TextWithLeftImge value='店铺简称最多8个字' left_icon={asterisk}/>
                <View style={{height: 40}}/>
                <Button style={styles.button} textStyle={styles.button_text} onPress={() => this.onEnsure()}>
                    确定
                </Button>

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
            NetUtil.postJson('employee/update_employee_info', {nickName: nickName}, (data) => {
                this.props.navigation.goBack()
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
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