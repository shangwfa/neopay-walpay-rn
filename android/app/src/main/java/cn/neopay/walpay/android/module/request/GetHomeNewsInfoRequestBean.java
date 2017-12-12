package cn.neopay.walpay.android.module.request;

/**
 * @author carlos.guo
 * @date 2017/12/11
 * @describe
 */

public class GetHomeNewsInfoRequestBean extends BaseRequest {
    private String pageNo;

    public String getPageNo() {
        return pageNo;
    }

    public void setPageNo(String pageNo) {
        this.pageNo = pageNo;
    }
}
