package cn.neopay.walpay.android.module.request;

/**
 * @author carlos.guo
 * @date 2017/12/22
 * @describe
 */

public class RedPacketStateRequestBean extends BaseRequest {
    private String packetCode;

    public RedPacketStateRequestBean(String packetCode) {
        this.packetCode = packetCode;
    }

    public String getPacketCode() {
        return packetCode;
    }

    public void setPacketCode(String packetCode) {
        this.packetCode = packetCode;
    }
}
