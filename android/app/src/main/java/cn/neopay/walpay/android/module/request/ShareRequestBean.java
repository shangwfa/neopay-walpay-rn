package cn.neopay.walpay.android.module.request;

/**
 * @author carlos.guo
 * @date 2017/12/21
 * @describe
 */

public class ShareRequestBean extends BaseRequest {
    /**
     * 分享内容
     */
    private String content;
    /**
     * 消息类型
     */
    private Integer shareType;
    /**
     * code 当分享红包时 这个传红包的code
     */
    private String code;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getShareType() {
        return shareType;
    }

    public void setShareType(Integer shareType) {
        this.shareType = shareType;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
