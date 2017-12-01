package cn.neopay.walpay.android;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.xgjk.common.lib.base.BaseApp;

import java.util.Collections;
import java.util.List;

import cn.neopay.walpay.android.constans.IWalpayConstants;
import cn.neopay.walpay.android.manager.APPInitializationManager;
import cn.neopay.walpay.android.rn.RNPackage;

/**
 * Created by XG on 2017/9/20.
 */

public class WalpayApp extends BaseApp implements ReactApplication {
    public static final RNPackage rnPackage = new RNPackage();

    public WalpayApp() {
        super(IWalpayConstants.APPLICATION_LIKE_CLASSPATH);
        application = this;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initAPP();
    }

    private void initAPP() {
        SoLoader.init(this, /* native exopackage */ false);
        APPInitializationManager.init(this);
    }


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Collections.emptyList();
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    public static RNPackage getRnPackage() {
        return rnPackage;
    }
}
