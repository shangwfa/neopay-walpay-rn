package cn.neopay.walpay.android.module.response;

/**
 * @author carlos.guo
 * @date 2017/12/22
 * @describe
 */

public class RedPacketStateResponseBean extends BaseResponse {

    /**
     * luckyAmount : 13
     * message : obribUYY
     * receiveStatus : 11
     * receiveStatusText : acIPNb
     */

    private int luckyAmount;
    private String message;
    private int receiveStatus;
    private String receiveStatusText;

    public int getLuckyAmount() {
        return luckyAmount;
    }

    public void setLuckyAmount(int luckyAmount) {
        this.luckyAmount = luckyAmount;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getReceiveStatus() {
        return receiveStatus;
    }

    public void setReceiveStatus(int receiveStatus) {
        this.receiveStatus = receiveStatus;
    }

    public String getReceiveStatusText() {
        return receiveStatusText;
    }

    public void setReceiveStatusText(String receiveStatusText) {
        this.receiveStatusText = receiveStatusText;
    }
}
