/**
 * @author: carlos.guo
 * @data:  2017/12/7.
 * @description: 发送手机验证码--弹窗
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, Modal, TouchableOpacity, TextInput,
} from 'react-native'
import colors from "../constants/colors";
import img_close from "../res/img/img_close.png";
import img_auth_code from "../res/img/img_auth_code.png";
import img_phone_gray from "../res/img/img_phone_gray.png";
import AuthMessageComponent from "../components/AuthMessageComponent";
import ApiManager from "../utils/ApiManager";
import StringUtils from "../utils/StringUtils";
class SendPhoneAuthCodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentValue: ""
        }
    }

    componentWillMount() {
        ApiManager.getUserInfo((data) => {
            this.setState({
                contentValue: data.phone
            })
        })
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isShow}
                onRequestClose={() => {
                }}>
                <View ref="authModal" style={styles.modalStyle}>
                    <View style={styles.container}>
                        {/*title*/}
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 16}}>
                            <TouchableOpacity onPress={this.props.closeClick}>
                                <Image
                                    style={styles.img_close}
                                    source={img_close}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 14, color: "#333"}}>{this.props.title}</Text>
                        </View>
                        <AuthMessageComponent
                            style={{marginTop: 30}}
                            placeholderType=""
                            contentValue={StringUtils.phoneTuoMi(this.state.contentValue)}
                            keybordType="numeric"
                            isEditable={false}
                            icon={img_phone_gray}
                            textInputChangeText={this._handleTextInputChangeText.bind(this)}
                        />
                        <AuthMessageComponent
                            ref="authMsg"
                            style={{marginTop: 20, marginBottom: 33}}
                            placeholderType="请输入验证码"
                            keybordType="numeric"
                            icon={img_auth_code}
                            textInputChangeText={this._handleAuthMsgTextInputChangeText.bind(this)}
                            timerClick={this._handleAuthMsgClick.bind(this)}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    _handleTextInputChangeText = (text) => {
    };
    startAuthMsg = () => {
        this.refs.authMsg.startTimerClick();
    };
    _handleAuthMsgClick = () => {
        this.props.authMsgClick();
    };
    _handleAuthMsgTextInputChangeText = (text) => {
        this.props.authMsgTextChangeClick(text);
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        backgroundColor: '#cccccc80',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img_close: {
        height: 11,
        width: 11,
        marginLeft: 13,
        marginRight: 20,
        resizeMode: "cover"
    },
    container: {
        borderRadius: 5,
        backgroundColor: "#FFF",
        width: 316,
        marginLeft: 30,
        marginRight: 30,
    }
});

export default SendPhoneAuthCodeModal