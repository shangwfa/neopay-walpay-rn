/**
 * @author: carlos.guo
 * @data:  2017/11/8.
 * @description: 发红包--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    NativeModules, DeviceEventEmitter,
    Image, TouchableOpacity,
} from 'react-native'
import BasePage from "./BasePage";
import Header from "../components/Header";
import img_question from "../res/img/img_question.png";
import CommonButton from "../components/CommonButton";
import Space from "../components/Space";
import RedPacketInputComponent from "../components/RedPacketInputComponent";
import StringUtils from "../utils/StringUtils";
import OneButtonModal from "../modal/OneButtonModal";
import PayPwdModal from "../modal/PayPwdModal";
import ApiManager from "../utils/ApiManager";
import {RouterPaths} from "../constants/RouterPaths";
class SendRedPacketPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            redTheme: "普通",
            redPacketNum: "",
            redPacketAmount: "",
            redPacketMessage: "恭喜发财!",
            isRandomRedPacket: true,
            redPacketAmountText: "金额",
            isShow: false,
            isShowPay: false,
            contentModal: "",
            contentFront: "",
            payTypeContent: "",
            contentBack: "",
            payTypeSourceData: {},
            redPacketSourceData: {},
            payResultSourceData: {},

        };
    }

    componentWillMount() {
        this._handleRedPacketAmountText();
        ApiManager.getRecentPayType({}, (data) => {
            this.setState({
                payTypeSourceData: data
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    rightIconStyle={{width: 20, height: 20, resizeMode: "cover"}}
                    rightIcon={img_question}
                    onRightPress={this._handleRightArrowClick.bind(this)}
                    navigation={this.props.navigation}
                    title='发红包'/>
                <RedPacketInputComponent
                    containerTypeStyle={{marginTop: 10}}
                    contentType="红包个数"
                    placeholderType="请填写红包个数"
                    keybordType="numeric"
                    onTextInputClick={this._handleTextInputClick.bind(this)}
                    textInputChangeListener={this._handleRedPacketNumListener.bind(this)}/>
                {this._renderLineView()}
                {this._renderRedPacketTypeView()}
                <RedPacketInputComponent
                    contentType={this.state.redPacketAmountText}
                    placeholderType="塞进红包的金额"
                    keybordType="numeric"
                    contentEndUnit="元"
                    onTextInputClick={this._handleTextInputClick.bind(this)}
                    textInputChangeListener={this._handleRedPacketAmountListener.bind(this)}/>
                {this._renderLineView()}
                <RedPacketInputComponent
                    contentType="红包主题"
                    conentValue={this.state.redTheme}
                    isEditable={false}
                    isShowArrow={true}
                    onTextInputClick={this._handleRedThemeClick.bind(this)}
                    textInputChangeListener={this._handleRedPacketListener.bind(this)}/>
                <RedPacketInputComponent
                    containerTypeStyle={{marginTop: 10}}
                    contentType="留言"
                    placeholderType="恭喜发财!"
                    keybordType="default"
                    onTextInputClick={this._handleTextInputClick.bind(this)}
                    textInputChangeListener={this._handleRedPacketMessageListener.bind(this)}/>
                <CommonButton value='发红包啦！' style={{marginTop: 68}} onPress={this._handleButtonClick.bind(this)}/>
                <OneButtonModal
                    onPress={this._handleBtnModalClick}
                    btnTitle="确定"
                    content={this.state.contentModal}
                    isShow={this.state.isShow}/>
                <PayPwdModal
                    isShow={this.state.isShowPay}
                    onForgetPwd={this._handlePayOnForgetPwdClick}
                    contentFront={this.state.contentFront}
                    contentBack={this.state.contentBack}
                    payTypeContent={this.state.payTypeContent}
                    selectPayStyleClick={this._handleSelectPayStyleClick}
                    onClose={this._handlePayOnCloseClick}
                    onEnd={this._handlePayEndClick}/>
            </View>
        );
    }

    emitEvent = (event) => {
        switch (event.type) {
            case 0://选择红包主题
                this.setState({
                    redTheme: event.redTheme
                });
                break;
            case 1://payTypeDesc 选择银行卡
                this.setState({
                    payTypeContent: event.payTypeContent
                });
                break;
        }

    };
    _renderLineView = () => {
        return <View style={{backgroundColor: "#FFF"}}>
            <View style={{height: 1, marginLeft: 13, backgroundColor: "#F5F5F5",}}/>
        </View>;
    };
    _renderRedPacketTypeView = () => {
        if (this.state.redPacketNum > 1) {
            return (
                <View>
                    <View style={styles.red_packet_view_container}>
                        <Text style={{marginLeft: 13, fontSize: 14, color: "#333"}}>红包类型</Text>
                        <Space/>
                        {/*随机*/}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this._handleIsRandomRedPacketTypeClick}
                            style={[styles.red_packet_type_container, {backgroundColor: this.state.isRandomRedPacket ? "#F34646" : "#FFF"},
                                !this.state.isRandomRedPacket ? styles.border_style : styles.border_style_no]}>
                            <Text
                                style={[{fontSize: 13},
                                    {color: this.state.isRandomRedPacket ? "#FFF" : "#F34646"}]}>随机红包</Text>
                        </TouchableOpacity>
                        {/*等额*/}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this._handleIsEquRedPacketTypeClick}
                            style={[styles.red_packet_type_container, {marginLeft: 24,}, {backgroundColor: !this.state.isRandomRedPacket ? "#F34646" : "#FFF"},
                                this.state.isRandomRedPacket ? styles.border_style : styles.border_style_no]}>
                            <Text
                                style={[{fontSize: 13}, {color: !this.state.isRandomRedPacket ? "#FFF" : "#F34646"}]}>等额红包</Text>
                        </TouchableOpacity>
                        <View style={{width: 30}}/>
                    </View>
                    {this._renderLineView()}
                </View>
            );
        }
    };
    _handleSelectPayStyleClick = () => {
        this.setState({
            isShowPay: false
        });
        let params = {
            pageType: 1
        };
        this.props.navigation.navigate(RouterPaths.BIND_BANK_CARD_PAGE, params);
    };
    _handlePayEndClick = (text) => {
        let request = {
            packetCode: this.state.redPacketSourceData.packetCode,
            payPassword: text.toString().trim(),
            payType: this.state.payTypeSourceData.payType,
            bankCardId: this.state.payTypeSourceData.bankCardId
        };
        ApiManager.payRedPacket(request, (data) => {
            this.setState({
                payResultSourceData: data
            });
        });
        if (this.state.payResultSourceData) {
            this.setState({
                isShowPay: false,
            });
            this.props.navigation.navigate(RouterPaths.RED_PACKETS_READY_PAGE, {info: this.state.payResultSourceData});
        }
    };
    _handlePayOnForgetPwdClick = () => {
        const params = {page: 'resetPayPwd'};
        NativeModules.commModule.jumpToNativePage('normal', JSON.stringify(params))
    };
    _handlePayOnCloseClick = () => {
        this.setState({
            isShowPay: false
        });
    };
    _handleBtnModalClick = () => {
        this.setState({
            isShow: false
        });
    };
    _handleIsRandomRedPacketTypeClick = () => {
        this.setState({
            isRandomRedPacket: true,
            redPacketAmountText: "金额"
        });
    };
    _handleIsEquRedPacketTypeClick = () => {
        this.setState({
            isRandomRedPacket: false,
            redPacketAmountText: "单个红包金额"
        });
    };
    _handleRedPacketAmountText = () => {
        let textContent;
        if (this.state.isRandomRedPacket) {
            textContent = "金额"
        } else {
            textContent = "单个红包金额"
        }
        this.setState({
            redPacketAmountText: textContent
        });

        DeviceEventEmitter.addListener("event", (data) => {
            this.setState({
                redTheme: data.themeUrl
            });
        })
    };
    _handleTextInputClick = () => {
    };
    _handleRedThemeClick = (item) => {
        this.props.navigation.navigate(RouterPaths.RP_TITLE_STYLE, {themeUrl: this.state.redTheme});
    };
    _handleRedPacketListener = (text) => {
    };
    _handleRedPacketNumListener = (text) => {
        this.setState({
            redPacketNum: text
        });
    };
    _handleRedPacketAmountListener = (text) => {
        if (parseInt(text.toString().trim()) > 2000) {
            NativeModules.commModule.toast('红包金额不能超过2000元');
            return;
        }
        this.setState({
            redPacketAmount: text
        });
    };
    _handleRedPacketMessageListener = (text) => {
        this.setState({
            redPacketMessage: text,
        });
    };
    _handleButtonClick = () => {
        this._handleCheckText();
    };
    _handleRightArrowClick = () => {
        this.props.navigation.navigate(RouterPaths.INSTRUCTIONS_PAGE);
    };
    _handleCheckText = () => {
        if (StringUtils.isEmpty(this.state.redPacketNum.toString())
            || parseInt(this.state.redPacketNum.toString().trim()) <= 0) {
            NativeModules.commModule.toast('红包个数必须大于0');
            return;
        }
        if (StringUtils.isEmpty(this.state.redPacketNum.toString())
            || parseInt(this.state.redPacketNum.toString().trim()) > 99) {
            NativeModules.commModule.toast('红包个数不能超过99');
            return;
        }
        if (StringUtils.isEmpty(this.state.redPacketAmount.toString())
            || parseInt(this.state.redPacketAmount.toString().trim()) <= 0) {
            NativeModules.commModule.toast('请输入金额');
            return;
        }
        if (!this.state.isRandomRedPacket
            && this.state.redPacketNum * this.state.redPacketAmount > 2000) {
            let contentModal = `请修改单个红包金额数，或修改红包个数\n\n红包总金额最高限额为 2000.00元\n\n当前红包总金额为
            ${this.state.redPacketNum * this.state.redPacketAmount} 元`;
            this.setState({
                contentModal: contentModal,
                isShow: true,
            });
            return;
        }
        let request = {
            bossType: 1,
            packetType: this.state.isRandomRedPacket ? 1 : 2,
            amount: this.state.redPacketAmount,
            totalCount: this.state.redPacketNum,
            themeUrl: this.state.redTheme,
            message: this.state.redPacketMessage,
        };
        ApiManager.createRedPacket(request, (data) => {
            this.setState({
                redPacketSourceData: data
            });
        });
        if (this.state.redPacketSourceData) {
            this._handleShowPayModal();
        }
    };
    _handleShowPayModal = () => {
        let contentFront = `实付金额`;
        let contentBack = `${this.state.redPacketNum * this.state.redPacketAmount}元`;
        this.setState({
            contentFront: contentFront,
            contentBack: contentBack,
            payTypeContent: this.state.payTypeSourceData.payTypeDesc,
            isShowPay: true,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    red_packet_type_container: {
        width: 70,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    red_packet_view_container: {
        flexDirection: "row",
        height: 51,
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    border_style: {
        borderWidth: 1,
        borderColor: "#CCC"
    },
    border_style_no: {}
});

export default SendRedPacketPage