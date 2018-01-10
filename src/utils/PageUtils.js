import BasePage from "../page/BasePage";
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
import WarpRedPacket from '../data/WarpRedPacket.json'
import FormatUtils from "../utils/FormatUtils";
import TwoButtonModal from "../modal/TwoButtonModal";
import StateUtils from "./StateUtils";
/**
 * @author: carlos.guo
 * @data:  2017/11/20.
 * @description: 页面导入管理器--工具类
 */
/**************************************页面导入管理器************************************/

module.exports = {
    BasePage,
    Header,
    img_question,
    RedPacketInputComponent,
    StringUtils,
    OneButtonModal,
    CommonButton,
    Space,
    PayPwdModal,
    ApiManager,
    RouterPaths,
    SelectPayStyleModal,
    SendPhoneAuthCodeModal,
    ReceiveRedPacketModal,
    WarpRedPacket,
    FormatUtils,
    TwoButtonModal,
    StateUtils
};