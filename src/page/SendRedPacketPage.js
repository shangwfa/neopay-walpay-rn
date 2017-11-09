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
    NativeModules,
    Image, TouchableOpacity,
} from 'react-native'
import BasePage from "./BasePage";
import Header from "../components/Header";
import img_question from "../res/img/img_question.png";
import CommonButton from "../components/CommonButton";
import Space from "../components/Space";
import RedPacketInputComponent from "../components/RedPacketInputComponent";
import StringUtils from "../utils/StringUtils";
class SendRedPacketPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            redTheme: "普通",
            redPacketNum: "",
            redPacketAmount: "",
            redPacketMessage: "",
            isRandomRedPacket: false,
            redPacketAmountText: "金额"
        };
    }

    componentWillMount() {
        this._handleRedPacketAmountText();
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
            </View>
        );
    }

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
        alert("红包主题" + item);
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
            redPacketMessage: text
        });
    };
    _handleButtonClick = () => {
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
            //TODO 弹窗
            NativeModules.commModule.toast('红包金额不能超过2000元');
            return;
        }
        //TODO 支付密码框
    };
    _handleRightArrowClick = () => {
        alert("红包规则");
    };
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