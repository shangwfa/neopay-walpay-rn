package cn.neopay.walpay.android.ui;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.WindowManager;

import com.xgjk.common.lib.manager.storage.StoreManager;
import com.xgjk.common.lib.utils.HandlerUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.utils.BusniessUtils;

/**
 * @author carlos.guo
 * @date 2017/9/25
 * @describe MainActivity 主页面
 */
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        hideStatusBar();
        setContentView(R.layout.activity_main);
        jumpToAppStatePage();
    }

    private void jumpToAppStatePage() {
        final boolean isFirstInstall = StoreManager.getSingleton().getBoolean(false, IWalpayConstants.IS_FIRST_INSTALL, true);

        HandlerUtils.runOnUiThreadDelay(() -> {
            if (isFirstInstall) {
                MainRouter.getSingleton().jumpToSplashPage();
                finish();
                return;
            }
//            if (StringUtils.isEmpty(BusniessUtils.getAccessToken())) {
                MainRouter.getSingleton().jumpToLoginPage(BusniessUtils.getUserName());
//                finish();
//                return;
//            }
            MainRouter.getSingleton().jumpToHomePage("");
            finish();
        }, IWalpayConstants.DELAY_TIME);

    }


    private void hideStatusBar() {
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }
}
