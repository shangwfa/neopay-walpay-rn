package cn.neopay.walpay.android.manager.jpushmanager;

/**
 * @author carlos.guo
 * @date 2017/12/15
 * @describe 推送下来的 的数据bean
 */

public class JPushDataBean {

    /** private Integer noticeType;
     * 通知类型
     *
     * RED_PACKET_COMING(1, "红包来了"),
     * PAY_NOTICE(2, "支付消息"),
     * PHONE_RECHARGE_SUCCESS(3, "手机话费到账成功"),
     * PHONE_DATA_RECHARGE_SUCCESS(4, "手机流量到账成功"),
     * MERCHANT_BROADCAST(5, "商家广播"),
     * DISCOUNTS_NOTICE(6, "聚惠进行时"),
     * SYSTEM_NOTICE(7, "系统消息"),
     * SYSTEM_ACT_NOTICE(8, "系统活动"),
     *
     * 通知消息参数 JSON
     * orderNo,redPacketCode,actCode    private String params;
     *
     * 跳转方式 1native 2h5   private Integer redirectType;
     *
     * 跳转url h5时  private String redirectUrl;
     */


    /**
     * extraParam : {"noticeType":2,"params":"{\"orderNo\":\"130103201712151817330465\"}","redirectType":1}
     */

    private String extraParam;

    public String getExtraParam() {
        return extraParam;
    }

    public void setExtraParam(String extraParam) {
        this.extraParam = extraParam;
    }
}
