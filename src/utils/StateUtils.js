/**
 * @author: carlos.guo
 * @data:  2017/11/20.
 * @description: 页面状态管理器--工具类
 */
/**************************************页面状态************************************/
let sendRedPacketPageState = {
    //----------------------------------大红包状态------------------------------------//
    redThemeName: "",
    redPacketNum: "",
    redPacketAmount: "",
    redPacketMessage: "",
    isRandomRedPacket: true,
    isShowSelectPayStyle: false,
    isShowWarpAction: false,
    isRefreshRequest: false,
    isShowBindCard: false,
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
    redPacketThemeCode: '',
    payAllAmount: "",
    accountAmount: ""
};
export  {
    sendRedPacketPageState
};