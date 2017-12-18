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
    NativeModules, DeviceEventEmitter, ScrollView,
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
import SelectPayStyleModal from "../modal/SelectPayStyleModal";
import SendPhoneAuthCodeModal from "../modal/SendPhoneAuthCodeModal";
import ReceiveRedPacketModal from "../modal/ReceiveRedPacketModal";
import WarpRedPacket from '../data/RecivedRedPacket.json'
import FormatUtils from "../utils/FormatUtils";
class SendRedPacketPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            redThemeName: "",
            redPacketNum: "",
            redPacketAmount: "",
            redPacketMessage: "",
            isRandomRedPacket: true,
            isShowSelectPayStyle: false,
            isShowWarpAction: false,
            redPacketAmountText: "金额",
            isShow: false,
            isShowPay: false,
            isAuthMsgShow: false,
            contentModal: "",
            contentFront: "",
            payTypeContent: "",
            contentBack: "",
            bankCardId: "",
            payType: "",
            payTypeSourceData: {},
            redPacketSourceData: {},
            redPacketThemeSourceData: {},
            payResultSourceData: {},
            redPacketThemeCode: ''

        };
    }

    componentWillMount() {
        this._handleRedPacketAmountText();
        ApiManager.getRecentPayType({}, (data) => {
            this.setState({
                payTypeSourceData: data,
                payType: data.payType,
                bankCardId: data.bankCardId,
            });
        });
        this._handleRedPacketTheme();

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
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <RedPacketInputComponent
                        containerTypeStyle={{marginTop: 10}}
                        contentType="红包个数"
                        placeholderType="请填写红包个数"
                        keybordType="numeric"
                        conentValue={this.state.redPacketNum}
                        onTextInputClick={this._handleTextInputClick.bind(this)}
                        textInputChangeListener={this._handleRedPacketNumListener.bind(this)}/>
                    {this._renderLineView()}
                    {this._renderRedPacketTypeView()}
                    <RedPacketInputComponent
                        textInputStyle={{marginRight: 8}}
                        contentType={this.state.redPacketAmountText}
                        placeholderType="塞进红包的金额"
                        keybordType="numeric"
                        conentValue={this.state.redPacketAmount}
                        contentEndUnit="元"
                        onTextInputClick={this._handleTextInputClick.bind(this)}
                        textInputChangeListener={this._handleRedPacketAmountListener.bind(this)}/>
                    {this._renderLineView()}
                    <RedPacketInputComponent
                        contentType="红包主题"
                        conentValue={this.state.redThemeName}
                        isEditable={false}
                        isShowArrow={true}
                        onTextInputClick={this._handleRedThemeClick.bind(this)}
                        textInputChangeListener={this._handleRedPacketListener.bind(this)}/>
                    <RedPacketInputComponent
                        textInputStyle={{color: "#DDD"}}
                        containerTypeStyle={{marginTop: 10}}
                        contentType="留言"
                        conentValue={this.state.redPacketMessage}
                        keybordType="default"
                        onTextInputClick={this._handleTextInputClick.bind(this)}
                        textInputChangeListener={this._handleRedPacketMessageListener.bind(this)}/>
                    <CommonButton value='发红包啦！' style={{marginTop: 68}} onPress={this._handleButtonClick.bind(this)}/>
                    <OneButtonModal
                        onPress={this._handleBtnModalClick}
                        btnTitle="确定"
                        content={this.state.contentModal}
                        isShow={this.state.isShow}/>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.tip_txt}>24小时未被领取，金额退回余额中</Text>
                    </View>
                </ScrollView>
                <PayPwdModal
                    isShow={this.state.isShowPay}
                    onForgetPwd={this._handlePayOnForgetPwdClick}
                    contentFront={this.state.contentFront}
                    contentBack={this.state.contentBack}
                    payTypeContent={this.state.payTypeContent}
                    selectPayStyleClick={this._handleSelectPayStyleClick}
                    onClose={this._handlePayOnCloseClick}
                    onEnd={this._handlePayEndClick}/>
                <SelectPayStyleModal
                    title="更换付款方式"
                    selectBankId={this.state.bankCardId}
                    bankCardFooterItemClick={this._handleBankCardFooterItemClick.bind(this)}
                    bankCardItemClick={this._handleBankCardItemClick.bind(this)}
                    closeClick={this._handleSelectPayStyleCloseClick.bind(this)}
                    isShow={this.state.isShowSelectPayStyle}/>
                <SendPhoneAuthCodeModal
                    ref="authModal"
                    title="为保证资金安全，本次交易需填写验证码"
                    isShow={this.state.isAuthMsgShow}
                    closeClick={this._handleAuthMsgCloseClick}
                    authMsgTextChangeClick={this._handleAuthMsgTextChangeClick.bind(this)}
                />
                <ReceiveRedPacketModal
                    action={WarpRedPacket}
                    isShow={this.state.isShowWarpAction}/>
            </View>
        );
    }

    _handleRedPacketTheme = () => {
        ApiManager.getRedPacketThemeList((data) => {
            this.setState({
                redPacketThemeSourceData: data,
                redPacketMessage: data[0].blessingWords,
                redThemeName: data[0].name,
                redPacketThemeCode: data[0].themeCode,
            });
        });
    };
    _handleAuthMsgTextChangeClick = (text) => {
        if (text.length === 6) {
            let request = {
                packetCode: this.state.redPacketSourceData.packetCode,
                orderNo: this.state.payResultSourceData.orderNo,
                verifyCode: text,
            };
            let redPacketResult = {
                redPacketState: false,
                orderNo: this.state.payResultSourceData.orderNo,
                packetCode: this.state.payResultSourceData.packetCode,
                amount: this.state.payResultSourceData.amount,
                totalCount: this.state.payResultSourceData.totalCount,
                payTypeDesc: this.state.payResultSourceData.payTypeDesc,
            };
            this.setState({
                isShowWarpAction: true
            });
            ApiManager.payRedPacketVerify(request, (data) => {
                setTimeout(() => {
                    this._handleRedPacketJump(data, redPacketResult);
                    this._handleRedPackProcess(data, redPacketResult);
                }, 2000);
            })
        }
    };

    _handleRedPackProcess(data, redPacketResult) {
        if (3 === data.payStatus) {//process
            const now = Date.now();
            const overTimeStamp = now + 20 * 1000 + 100;
            /*过期时间戳（毫秒） +100 毫秒容错*/
            this.interval = setInterval(() => {
                const nowStamp = Date.now();
                if (nowStamp > overTimeStamp) {
                    /* 倒计时结束*/
                    this.setState({
                        isShowWarpAction: false
                    });
                    this.interval && clearInterval(this.interval);
                    redPacketResult.redPacketState = false;
                    this.props.navigation.navigate(RouterPaths.RED_PACKETS_READY_PAGE, redPacketResult);
                } else {
                    let request = {
                        packetCode: this.state.payResultSourceData.packetCode,
                    };
                    ApiManager.getRedPacketPayStatus(request, (data) => {
                        this._handleRedPacketJump(data, redPacketResult);
                        if (1 === data.payStatus || 2 === data.payStatus) {
                            this.interval && clearInterval(this.interval);
                            this.setState({
                                isShowWarpAction: false
                            });
                        }
                    });
                }
            }, 1000);
        }
    }

    componentWillUnMount() {
        clearInterval(this.interval)
    }

    _handleRedPacketJump(data, redPacketResult) {
        if (1 === data.payStatus) {//success
            redPacketResult.redPacketState = true;
            this.props.navigation.navigate(RouterPaths.RED_PACKETS_READY_PAGE, redPacketResult);
        } else if (2 === data.payStatus) {//fail
            redPacketResult.redPacketState = false;
            this.props.navigation.navigate(RouterPaths.RED_PACKETS_READY_PAGE, redPacketResult);
        }
    }

    _handleAuthMsgCloseClick = () => {
        this.setState({
            isAuthMsgShow: false
        })
    };
    emitEvent = (event) => {
        switch (event.type) {
            case "redTheme"://选择红包主题
                this.setState({
                    redThemeName: event.data.name,
                    redPacketMessage: event.data.blessingWords,
                    redPacketThemeCode: event.data.themeCode
                });
                break;
            case 1://payTypeDesc 选择银行卡
                this.setState({
                    payTypeContent: event.payTypeContent
                });
                break;
            case "redPacketResultGoBack"://红包结果页面返回redPacketResultGoBack
                this.setState({
                    redPacketAmount: "",
                    redPacketNum: ""
                });
                this._handleRedPacketTheme();
                break;
            case "redPacketResultRePay"://红包重新支付redPacketResultRePay
                this._handleShowPayModal();
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
                            style={[styles.red_packet_type_container, {marginLeft: 15,}, {backgroundColor: !this.state.isRandomRedPacket ? "#F34646" : "#FFF"},
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
            isShowSelectPayStyle: true,
        });
    };
    _handlePayEndClick = (text) => {
        let request = {
            packetCode: this.state.redPacketSourceData.packetCode,
            payPassword: text.toString().trim(),
            payType: this.state.payType,
            bankCardId: this.state.bankCardId
        };
        ApiManager.payRedPacket(request, (data) => {
            this.setState({
                payResultSourceData: data
            });
            this.setState({
                isShowWarpAction: true
            });
            setTimeout(() => {
                if (1 === data.smsFlag) {//需要短信验证
                    this.setState({
                        isAuthMsgShow: true,
                        isShowWarpAction: false
                    })
                } else if (2 === data.smsFlag) {
                    this._handlePayRedPacketResult(data);
                    if (1 === data.payStatus || 2 === data.payStatus) {
                        this.setState({
                            isShowWarpAction: false
                        });
                    }
                }
            }, 2000);
        });

    };

    _handlePayRedPacketResult(data) {
        if (this.state.payResultSourceData) {
            this.setState({
                isShowPay: false,
            });
            let redPacketResult = {
                redPacketState: false,
                orderNo: this.state.payResultSourceData.orderNo,
                packetCode: this.state.payResultSourceData.packetCode,
                amount: this.state.payResultSourceData.amount,
                totalCount: this.state.payResultSourceData.totalCount,
                payTypeDesc: this.state.payResultSourceData.payTypeDesc,
            };
            this._handleRedPacketJump(data, redPacketResult);
            this._handleRedPackProcess(data, redPacketResult);
        }
    }

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

    };
    _handleTextInputClick = () => {
    };
    _handleRedThemeClick = (item) => {
        this.props.navigation.navigate(RouterPaths.RP_TITLE_STYLE, {blessingWords: this.state.redPacketMessage});
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
    _handleBankCardFooterItemClick = () => {
        this.setState({
            isShowSelectPayStyle: false,
            isShowPay: false,
        });
        let params = {
            pageType: 1,
            type: 3
        };
        this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD, params);
    };
    _handleSelectPayStyleCloseClick = () => {
        this.setState({
            isShowSelectPayStyle: false
        });
    };
    _handleBankCardItemClick = (bankCardData) => {
        let nameDes = bankCardData.id === -1 ? `(${FormatUtils.money(bankCardData.cardNo)})` : `(${bankCardData.cardNo.substring(bankCardData.cardNo.length - 4, bankCardData.cardNo.length)})`;
        this.setState({
            isShowSelectPayStyle: false,
            payTypeContent: bankCardData.bankName + nameDes,
            payType: bankCardData.id === -1 ? 2 : 1,
            bankCardId: bankCardData.id,
        });

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
        if (2000 < this.state.redPacketNum * this.state.redPacketAmount) {
            let contentModal = `请修改单个红包金额数，或修改红包个数\n\n红包总金额最高限额为 2000.00元\n\n当前红包总金额为${this.state.redPacketNum * this.state.redPacketAmount}元`;
            this.setState({
                contentModal: contentModal,
                isShow: true,
            });
            return;
        }
        let request = {
            packetType: this.state.isRandomRedPacket ? 1 : 2,
            amount: this.state.redPacketAmount,
            totalCount: this.state.redPacketNum,
            themeCode: this.state.redPacketThemeCode,
            message: this.state.redPacketMessage,
        };
        ApiManager.createRedPacket(request, (data) => {
            this.setState({
                redPacketSourceData: data
            });
            if (data.packetCode) {
                this._handleShowPayModal();
            }
        });

    };
    _handleShowPayModal = () => {
        let contentFront = `实付金额`;
        let contentBack = `${FormatUtils.money(this.state.redPacketNum * this.state.redPacketAmount)}元`;
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
        borderRadius: 12,
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
    border_style_no: {},
    tip_txt: {
        fontSize: 12,
        color: "#666",
        marginTop: 206,
        marginBottom: 14
    }
});

export default SendRedPacketPage