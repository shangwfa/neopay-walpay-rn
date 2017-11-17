/**
 * @author: carlos.guo
 * @data:  2017/10/24.
 * @description: 网络请求-url集合
 */
export const APIS = {
    /**
     * 网络请求-api
     */
    QUERY_RED_PACKET_RECORD:"packet/query_red_packet_record_page",//红包交易明细
    QUERY_RECENT_RED_PACKET_LIST: "packet/query_recent_red_packet_list",  //获取红包列表
    GET_USER_INFO: 'user/get_user_info',//获取用户信息
    QUERY_USER_BILL_DETAIL: "pay/query_user_bill_detail",//查询用户账单详情
    GET_BANK_INFO_BY_CARD_NO: 'bank/get_bank_info_by_card_no',
    QUERY_BANNER_LIST: 'merchant/query_banner_list',
    BIND_BANK_CARD: 'bank/bind_bank_card',
    MODIFY_USER_NICKNAME: 'user/modify_user_nickname',
    QUERY_MERCHANT_BANNER_LIST: "merchant/query_merchant_banner_list",//获取商户活动banner列表
    QUERY_MERCHANT_ACTIVITY_PAGE: "merchant/query_merchant_activity_page",//获取商户活动列表
    QUERY_USER_MERCHANT_LIST: "merchant/query_user_merchant_list",//获取商户会员列表
    CREATE_PAY_QRCODE: "pay/create_pay_qrcode",//创建付款码
    GET_USER_BANK_CARD_LIST: "bank/get_user_bank_card_list",//获取用户银行卡列表
    QUERY_BANK_CARD_RECORD_PAGE: "pay/query_bank_card_record_page",//查询银行卡交易记录
    QUERY_BALANCE_RECORD_PAGE: "balance/query_balance_record_page",//获取余额交易记录
    PHONE_RECHARGE_ORDER_QUERY: "pcharge/phone_recharge_order_query",//获取手机充值和流量充值结果
    PHONE_RECHARGE_PRODUCT_LIST: "pcharge/query_phone_recharge_product_list",//获取手机充值产品列表
    QUERY_USER_RECEIVABLE_RED_PACKET_PAGE: "packet/query_user_receivable_red_packet_page",//查询用户未领取的红包列表
    QUERY_SQUARE_RED_PACKET_LIST: "packet/query_square_red_packet_list",//获取广场红包Page
    GET_RECENT_PAY_TYPE: "pay/get_recent_pay_type",//获取上一次付款方式
    CREATE_RED_PACKET: "packet/create_red_packet",//创建红包
    PAY_RED_PACKET: "packet/pay_red_packet",//支付红包
    USER_BILL_RECORD:'pay/query_user_bill_page',//账单记录
    QUERY_PAY_MESSAGE_PAGE:'message/query_pay_msg_page',//获取支付消息
};