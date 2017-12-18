package cn.neopay.walpay.android.manager.jpushmanager;

/**
 * @author carlos.guo
 * @date 2017/12/15
 * @describe
 */

public class JPushDataExtraBean {

    /**
     * noticeType : 2
     * params : {"orderNo":"170103201712151828098190"}
     * redirectType : 1
     */

    private int noticeType;
    private String params;
    private String redirectUrl;
    private int redirectType;

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public int getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(int noticeType) {
        this.noticeType = noticeType;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public int getRedirectType() {
        return redirectType;
    }

    public void setRedirectType(int redirectType) {
        this.redirectType = redirectType;
    }
}
