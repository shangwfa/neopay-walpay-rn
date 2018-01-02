/**
 * @author: carlos.guo
 * @data:  2017/10/30.
 * @description: 付款码--页面
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image, ScrollView, TouchableWithoutFeedback,
} from 'react-native'
import QRCode from 'react-native-qrcode';
import BasePage from "./BasePage";
import Header from "../components/Header";
import ApiManager from "../utils/ApiManager";
import colors from "../constants/colors";
import three_points from '../res/img/three_points.png';
import img_dashed_line from '../res/img/img_dashed_line.png';
import img_pay_code_bg from '../res/img/img_pay_code_bg.png';
import ScreenUtils from "../utils/ScreenUtils";
import TwoBottomItemModal from "../modal/TwoBottomItemModal";
import SupportTongBaoComponent from "../components/SupportTongBaoComponent";
import SelectPayStyleModal from "../modal/SelectPayStyleModal";
import StringUtils from "../utils/StringUtils";
import FormatUtils from "../utils/FormatUtils";
import AvatarComponent from "../components/AvatarComponent";
import ButtonComponent from "../components/ButtonComponent";
import {RouterPaths} from "../constants/RouterPaths";
class PayCodePage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            userInfoData: {},
            isShowBottom: false,
            isShowSelectPayStyle: false,
            payTypeDescTxt: "",
            payQRCodeDataContent: "",
            bankId: 0,
        }
    }

    componentDidMount() {
        ApiManager.getUserInfo((data) => {
            this.setState({
                userInfoData: data,
            });
        });
        ApiManager.getCreatePayQRCode({}, (data) => {
            this.setState({
                payTypeDescTxt: data.payTypeDesc,
                payQRCodeDataContent: data.content,
                bankId: data.id
            });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={img_pay_code_bg}
                    style={{width: ScreenUtils.width, height: ScreenUtils.height, resizeMode: "cover"}}>
                    {/*标题栏*/}
                    <Header
                        navigation={this.props.navigation}
                        backgroundColor={colors.transparent}
                        isShowLine={false}
                        title='向商家付钱'
                        isWhiteArrow={true}
                        textColor={colors.white}
                        rightIcon={three_points}
                        onRightPress={this._handleRightPressClick.bind(this)}/>
                    <ScrollView
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.item_container}>
                            {/*二维码*/}
                            <View style={{marginTop: 74, alignItems: "center"}}>
                                <QRCode
                                    value={this.state.payQRCodeDataContent}
                                    size={ScreenUtils.width * 0.688}
                                    bgColor='#000'
                                    fgColor='#FFF'/>
                            </View>
                            {/*虚线*/}
                            <Image
                                style={{width: ScreenUtils.width - 36, height: 1, marginTop: 20}}
                                source={img_dashed_line}/>
                            {/*选择银行卡*/}
                            <ButtonComponent
                                btnClick={this._handleBtnClick.bind(this)}
                                leftTitle="付款方式"
                                rightTitle={this.state.payTypeDescTxt}/>
                            {/*通宝会*/}
                            <SupportTongBaoComponent/>
                        </View>
                        {/*头像*/}
                        <View style={styles.img_container}>
                            <AvatarComponent
                                avatar={this.state.userInfoData.avatarUrl}/>
                        </View>
                    </ScrollView>
                </Image>
                {/*弹窗*/}
                <TwoBottomItemModal
                    oneItemTitle="使用说明"
                    twoItemTitle="关闭弹窗"
                    isShow={this.state.isShowBottom}
                    close={this._handleCloseClick.bind(this)}
                    ensure={this._handleEventCLick.bind(this)}/>
                <SelectPayStyleModal
                    title="更换付款方式"
                    selectBankId={this.state.bankId}
                    bankCardFooterItemClick={this._handleBankCardFooterItemClick.bind(this)}
                    bankCardItemClick={this._handleBankCardItemClick.bind(this)}
                    closeClick={this._handleSelectPayStyleCloseClick.bind(this)}
                    isShow={this.state.isShowSelectPayStyle}/>
            </View>
        );
    }

    _handleBankCardItemClick = (bankCardData) => {
        this.setState({
            isShowSelectPayStyle: false,
        });
        let requestBean = StringUtils.isContainChildrenStr(bankCardData.bankName, "余额") ?
            {"payType": 2} : {"payType": 1, "cardId": bankCardData.id};
        ApiManager.getCreatePayQRCode(requestBean, (data) => {
            this.setState({
                payTypeDescTxt: data.payTypeDesc,
                payQRCodeDataContent: data.content,
                bankId: data.id
            });
        })
    };
    _handleBankCardFooterItemClick = () => {
        this.setState({
            isShowSelectPayStyle: false,
        });
        this.props.navigation.navigate(RouterPaths.NEW_BIND_BANKCARD, {pageTitle: "添加绑定银行卡",type:3});
    };

    _handleBtnClick = () => {
        this.setState({
            isShowSelectPayStyle: true
        });
    };
    _handleCloseClick = () => {
        this.setState({
            isShowBottom: false
        });
    };
    _handleSelectPayStyleCloseClick = () => {
        this.setState({
            isShowSelectPayStyle: false
        });
    };
    _handleEventCLick = () => {
        this.setState({
            isShowBottom: false
        });
        this.props.navigation.navigate(RouterPaths.INSTRUCTIONS_PAGE);
    };
    _handleRightPressClick = () => {
        this.setState({
            isShowBottom: true
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    item_container: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 81,
        marginBottom: 74,
        backgroundColor: colors.white
    },
    img_container: {
        position: "absolute",
        marginTop: 38,
        marginLeft: (ScreenUtils.width - 86) / 2,
        alignItems: "center"
    },
    img: {
        width: 86,
        height: 86,
        borderRadius: 43,
    }
});

export default PayCodePage