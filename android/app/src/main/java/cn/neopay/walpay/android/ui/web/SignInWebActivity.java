package cn.neopay.walpay.android.ui.web;

import com.alibaba.android.arouter.facade.annotation.Route;
import com.xgjk.common.lib.base.BaseH5Activity;

import cn.neopay.walpay.android.constans.IWalpayConstants;

/**
 * @author carlos.guo
 * @date 2017/10/11
 * @describe SignInWebActivity 签到web
 */
@Route(path = IWalpayConstants.TO_SIGNINWEB_PAGE)
public class SignInWebActivity extends BaseH5Activity {
    @Override
    protected String loadUrl() {
        //TODO 获取url
        return "https://www.baidu.com/";
    }
}
