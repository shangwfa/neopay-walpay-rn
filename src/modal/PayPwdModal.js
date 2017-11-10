import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity
} from 'react-native'
import {Divider} from '../components/index'
import {colors} from '../constants/index'
import close_icon from '../res/img/close_icon.png'
import right_arrow from '../res/img/right_arrow.png'
import PasswordInput from '../components/PasswordInput'
class PayPwdModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
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

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isShow}
                onShow={() => {
                }}
                onRequestClose={() => {
                }}>
                <View style={styles.modalStyle}>
                    <View style={styles.container}>
                        <View style={styles.content_container}>
                            {this.renderTop()}
                            <View style={styles.line}/>
                            <Text style={{color: colors.black, fontSize: 14}}>{this.props.contentFront}<Text
                                style={{color: colors.black, fontSize: 20}}> {this.props.contentBack}</Text></Text>
                            <PasswordInput style={{width: 290, marginTop: 10}} maxLength={6}
                                           onEnd={(text) => this.props.onEnd(text)}/>
                            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 13}}>
                                <Text style={{color: colors.balck_more_light, fontSize: 14, marginLeft: 10}}>付款方式</Text>
                                <View style={{flex: 1}}/>
                                <Text style={{
                                    color: colors.black_light,
                                    fontSize: 14,
                                    marginLeft: 10
                                }}>{this.props.payTypeContent}</Text>
                                <Image style={{marginLeft: 8, width: 7, height: 12, marginRight: 10}}
                                       source={right_arrow}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
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
        backgroundColor: '#cccccc80',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    line: {
        backgroundColor: colors.divider,
        height: 0.5,
        width: 316,
    },
});

export default PayPwdModal