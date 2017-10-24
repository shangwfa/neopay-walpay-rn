package cn.neopay.walpay.android.rn;

import android.app.IntentService;
import android.content.Intent;

/**
 * Created by shangwf on 2017/10/22.
 */

public class RNService extends IntentService {

    public RNService() {
        super("RNService");
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        try {
            RNCacheViewManager.init();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
