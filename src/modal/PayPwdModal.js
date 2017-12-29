import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native'
import {Divider} from '../components/index'
import {colors} from '../constants/index'
import close_icon from '../res/img/close_icon.png'
import right_arrow from '../res/img/right_arrow.png'
import PasswordInput from '../components/PasswordInput'
import ScreenUtils from "../utils/ScreenUtils";
class PayPwdModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modalFlex: new Animated.Value(1.0)
        }
    }


    renderTop = () => {
        return (
            <View style={styles.top_container}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this.props.onClose()}>
                    <Image style={styles.close_icon} source={close_icon}/>
                </TouchableOpacity>

                <View style={{flex: 2, alignItems: 'center'}}>
                    <Text style={{color: colors.black, fontSize: 14}}>请输入支付密码</Text>
                </View>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}} onPress={() => this.props.onForgetPwd()}>
                    <Text style={{color: colors.balck_more_light, fontSize: 12, marginRight: 10}}>忘记密码</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderBottom = () => {
        if (!this.props.isHiddenBottom) {
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center',}}
                    onPress={() => this.props.selectPayStyleClick()}>
                    <View style={styles.select_pay_style_container}>
                        <Text style={styles.select_pay_style_txt}>付款方式</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.select_pay_content_txt}>{this.props.payTypeContent}</Text>
                        <Image style={{marginLeft: 8, width: 7, height: this.props.payTypeBalanceOnly?0:12, marginRight: 10}}
                               source={right_arrow}/>
                    </View>
                </TouchableOpacity>
            )

        } else {
            return (
                <View style={{height: 20}}/>
            )
        }
    }

    render() {
        return (
            <Modal
                ref="payPwdModal"
                animationType='fade'
                transparent={true}
                visible={this.props.isShow}
                onShow={() => {
                }}
                onRequestClose={() => {
                }}>
                <Animated.View style={[styles.modalStyle, {flex: this.state.modalFlex}]} ref='modalView'>
                    <View style={styles.container}>
                        <View style={styles.content_container}>
                            {this.renderTop()}
                            <View style={styles.line}/>
                            <Text style={{
                                color: colors.black,
                                fontSize: 14,
                                marginTop: 10,
                            }}>{this.props.contentFront}<Text
                                style={{color: colors.black, fontSize: 20}}> {this.props.contentBack}</Text></Text>
                            <PasswordInput
                                ref="textInput"
                                style={{width: 290, marginTop: 10}} maxLength={6}
                                onEnd={(text) => this.props.onEnd(text)}
                                onTextFocus={() => this.onTextFocus()}
                                onTextBlur={() => this.onTextBlur()}/>
                            {this.renderBottom()}
                        </View>
                    </View>
                </Animated.View>
            </Modal>
        );
    }
    _clearTextInput=()=>{
      this.refs.textInput._clearTextInputContent();
    };
    //增加弹窗在键盘聚焦的时候改变位置
    onTextFocus = () => {
        // console.log('收到键盘focus事件')
        if (!ScreenUtils.isIOS) return;

        Animated.timing(
            this.state.modalFlex,
            {
                toValue: 0.7,
                duration: 200,
            }
        ).start();
    }
    onTextBlur = () => {
        // console.log('收到键盘blur事件')
        if (!ScreenUtils.isIOS) return;

        Animated.timing(
            this.state.modalFlex,
            {
                toValue: 1.0,
                duration: 200,
            }
        ).start();
    }
}


const styles = StyleSheet.create({
    close_icon: {
        width: 11,
        height: 11,
        marginLeft: 13
    },
    top_container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    content_container: {
        width: 316,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius: 5,
    },
    container: {
        backgroundColor: colors.page_background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalStyle: {
        backgroundColor: colors.mask,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        backgroundColor: colors.divider,
        height: 0.5,
        width: 316,
    },
    select_pay_style_container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13
    },
    select_pay_style_txt: {
        color: colors.balck_more_light,
        fontSize: 14,
        marginLeft: 10
    },
    select_pay_content_txt: {
        color: colors.black_light,
        fontSize: 14,
        marginLeft: 10
    },
});

export default PayPwdModal