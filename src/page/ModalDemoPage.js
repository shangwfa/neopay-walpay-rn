import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native'
import BasePage from './BasePage'
import OperationStatusMoadl from '../modal/OperationStatusMoadl'
import UnbindBankCardModal from '../modal/TwoBottomItemModal'
import OneButtonModal from '../modal/OneButtonModal'
import TwoButtonModal from '../modal/TwoButtonModal'
import bind_card_failed_icon from '../res/img/bind_card_failed_icon.png'
import bind_card_success_icon from '../res/img/bind_card_success_icon.png'


class ModalDemoPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    setModalVisible = () => {
        this.setState({
            isShow: true
        })
    }


    close = () => {
        this.setState({
            isShow: false
        })
    }

    unBind = () => {
        this.setState({
            isShow: false
        })
        //解绑操作
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor='transparent' style={styles.buttonStyle}
                                    onPress={() => this.setModalVisible()}>
                    <Text style={styles.buttonText}>
                        点击弹窗
                    </Text>
                </TouchableHighlight>
                <Text>
                    <Text>First part and </Text>
                    <Text>second part</Text>
                </Text>
                {/*<DemoModal isShow={this.state.isShow} callback={(isShow)=>{*/}
                {/*this.setState({*/}
                {/*isShow:isShow*/}
                {/*})*/}
                {/*}}/>*/}
                {/*<OperationStatusMoadl  icon={bind_card_success_icon}  tip='解绑成功' isShow={this.state.isShow}/>*/}

                <UnbindBankCardModal isShow={this.state.isShow} close={()=>this.close()} unBind={()=>this.unBind()}/>
                {/*<OneButtonModal isShow={this.state.isShow} content='xxxxxxxxx' btnTitle="确定" onPress={()=>this.close()}/>*/}
                {/*<TwoButtonModal isShow={this.state.isShow} content='xxxxxxx' oneBtnText='忘记密码' twoBtnText='去登陆'*/}
                                {/*onePress={() => this.close()} twoPress={() => this.close()}/>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECF0',
    },

    buttonStyle: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        fontSize: 16,
        color: '#3393F2',
        textAlign: 'center',
    },
});

export default ModalDemoPage