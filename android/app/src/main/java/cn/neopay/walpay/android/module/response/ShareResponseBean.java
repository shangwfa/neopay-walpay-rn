package cn.neopay.walpay.android.module.response;

/**
 * @author carlos.guo
 * @date 2017/12/21
 * @describe
 */

public class ShareResponseBean extends BaseResponse {
    /**
     * 分享url
     */
    private String goUrl;
    /**
     * title
     */
    private String title;
    /**
     * 描述
     */
    private String desc;
    /**
     * 图片地址
     */
    private String imgUrl;

    public String getGoUrl() {
        return goUrl;
    }

    public void setGoUrl(String goUrl) {
        this.goUrl = goUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
