package cn.neopay.walpay.android.view.dialog;

import android.app.Activity;
import android.content.Context;
import android.databinding.DataBindingUtil;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.LayoutInflater;

import com.orhanobut.logger.Logger;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMWeb;
import com.xgjk.common.lib.base.BaseDialog;
import com.xgjk.common.lib.utils.ToastUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.databinding.CommonShareLayoutBinding;
import cn.neopay.walpay.android.http.BaseSubscriber;
import cn.neopay.walpay.android.manager.APPInitializationManager;
import cn.neopay.walpay.android.manager.apimanager.ApiManager;
import cn.neopay.walpay.android.module.request.ShareRequestBean;
import cn.neopay.walpay.android.module.response.ShareResponseBean;

/**
 * Created by shangwf on 2017/5/8.
 */

public class ShareDialog extends BaseDialog {

    public ShareDialog(@NonNull Context context) {
        super(context);
        initView(context, new ShareRequestBean());
    }

    public ShareDialog(@NonNull Context context, ShareRequestBean shareResponseBean) {
        super(context);
        initView(context, shareResponseBean);
    }

    private void initView(final Context context, ShareRequestBean shareResponseBean) {
        final LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        final CommonShareLayoutBinding mBinding = DataBindingUtil.inflate(inflater, R.layout.common_share_layout, null, false);
        setContentView(mBinding.getRoot());
        setFullScreenWidth();
        mLayoutParams.gravity = Gravity.BOTTOM;
        handleViewClick(context, shareResponseBean, mBinding);
    }

    private void handleViewClick(Context context, ShareRequestBean shareResponseBean, CommonShareLayoutBinding mBinding) {
        mBinding.shareWeixinFriendLl.setOnClickListener(view -> {
            if (handleAuthIsInatall((Activity) context)) return;
            if (shareResponseBean != null) {
                handleShare(context, shareResponseBean, SHARE_MEDIA.WEIXIN);
            }
        });

        mBinding.shareWeixinCircleLl.setOnClickListener(view -> {
            if (handleAuthIsInatall((Activity) context)) return;
            if (shareResponseBean != null) {
                handleShare(context, shareResponseBean, SHARE_MEDIA.WEIXIN_CIRCLE);
            }
        });

        mBinding.shareClose.setOnClickListener(view -> handleShareRelease(context));
    }

    private void handleShare(Context context, ShareRequestBean requestBean, SHARE_MEDIA shareMedia) {
        ApiManager.getSingleton().getShareMsg(requestBean, new BaseSubscriber((Activity) context,
                o -> handleShareResult(context, shareMedia, (ShareResponseBean) o)));
    }

    private void handleShareResult(Context context, SHARE_MEDIA shareMedia, ShareResponseBean responseBean) {
        UMImage thumb = new UMImage(context, responseBean.getImgUrl());
        UMWeb web = new UMWeb(responseBean.getGoUrl());
        web.setTitle(responseBean.getTitle());//标题
        web.setThumb(thumb);  //缩略图
        web.setDescription(responseBean.getDesc());//描述
        new ShareAction((Activity) context)
                .setPlatform(shareMedia)//传入平台
                .withMedia(web)
                .setCallback(umShareListener)//回调监听器
                .share();
        handleShareRelease(context);
    }

    private void handleShareRelease(Context context) {
        cancel();
        UMShareAPI.get(context).release();
    }

    private boolean handleAuthIsInatall(Activity context) {
        boolean install = APPInitializationManager.umShareAPI.isInstall(context, SHARE_MEDIA.WEIXIN);
        if (!install) {
            ToastUtils.show("未安装客户端");
            return true;
        }
        return false;
    }

    private UMShareListener umShareListener = new UMShareListener() {
        /**
         * @descrption 分享开始的回调
         * @param platform 平台类型
         */
        @Override
        public void onStart(SHARE_MEDIA platform) {

        }

        /**
         * @descrption 分享成功的回调
         * @param platform 平台类型
         */
        @Override
        public void onResult(SHARE_MEDIA platform) {
            ToastUtils.show("分享成功");
        }

        /**
         * @descrption 分享失败的回调
         * @param platform 平台类型
         * @param t 错误原因
         */
        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            Logger.d("分享失败原因：" + t.getMessage());
            ToastUtils.show("分享失败");
        }

        /**
         * @descrption 分享取消的回调
         * @param platform 平台类型
         */
        @Override
        public void onCancel(SHARE_MEDIA platform) {
            ToastUtils.show("分享取消了");
        }
    };
}
