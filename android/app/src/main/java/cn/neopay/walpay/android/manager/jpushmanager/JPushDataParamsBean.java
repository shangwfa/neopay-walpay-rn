package cn.neopay.walpay.android.manager.jpushmanager;

/**
 * @author carlos.guo
 * @date 2017/12/15
 * @describe
 */

public class JPushDataParamsBean {

    /**
     * orderNo : 170103201712151828098190  orderNo,redPacketCode
     */

    private String orderNo;
    private String redPacketCode;
    private String actCode;

    public String getRedPacketCode() {
        return redPacketCode;
    }

    public void setRedPacketCode(String redPacketCode) {
        this.redPacketCode = redPacketCode;
    }

    public String getActCode() {
        return actCode;
    }

    public void setActCode(String actCode) {
        this.actCode = actCode;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
}
