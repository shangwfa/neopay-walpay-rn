package cn.neopay.walpay.android.adapter.sliminjector;

import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.xgjk.common.lib.adapter.slimadapter.SlimInjector;
import com.xgjk.common.lib.adapter.slimadapter.viewinjector.IViewInjector;
import com.xgjk.common.lib.manager.glide.GlideManager;
import com.xgjk.common.lib.utils.FormatUtils;
import com.xgjk.common.lib.utils.StringUtils;

import cn.neopay.walpay.android.R;
import cn.neopay.walpay.android.manager.routermanager.MainRouter;
import cn.neopay.walpay.android.module.activityParams.RNActivityParams;
import cn.neopay.walpay.android.module.response.UserInfoResponseBean;
import cn.neopay.walpay.android.ui.RNActivity;

/**
 * @author carlos.guo
 * @date 2017/9/29
 * @describe MineUserInforSlimInjector 我的 用户信息item
 */

public class MineUserInforSlimInjector implements SlimInjector<UserInfoResponseBean> {
    @Override
    public void onInject(UserInfoResponseBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.with(R.id.mine_user_avatar_iv, view -> {
            if (null == data.getAvatarUrl() || TextUtils.isEmpty(data.getAvatarUrl())) {
                injector.background(R.id.mine_user_avatar_iv, R.mipmap.img_default_photo);
            }
            GlideManager.loadNetCircleImage((ImageView) view, data.getAvatarUrl());
            view.setOnClickListener(v -> {
                RNActivityParams activityParams = new RNActivityParams();
                activityParams.setRnPage(RNActivity.PageType.PERSONAL_INFO_PAGE);
                MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
            });
        });

        injector.with(R.id.mine_user_name_tv, view -> setAuthStateShow(data, injector, (TextView) view))
                .with(R.id.mine_go_auth_iv, view -> {
                    if (null == data.getAuthStatus()) {
                        return;
                    }
                    if (1 == data.getAuthStatus()) {//实名认证
                        view.setVisibility(View.INVISIBLE);
                        injector.background(R.id.mine_auth_state_iv, R.mipmap.img_auth_tag);
                    }
                    if (2 == data.getAuthStatus()) {//未实名认证
                        view.setVisibility(View.VISIBLE);
                        injector.background(R.id.mine_auth_state_iv, R.mipmap.img_not_auth_tag);
                        view.setOnClickListener(v -> {
                            //TODO 进行 实名认证
                        });
                    }

                })
        ;
    }

    private void setAuthStateShow(UserInfoResponseBean data, IViewInjector injector, TextView view) {
        if (null == data) {
            return;
        }
        String nickName = StringUtils.authString(data.getNickName());
        String phone = StringUtils.authString(data.getPhone());
        String name = StringUtils.authString(data.getName());

        if (StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 2 == data.getAuthStatus()) {//未设置昵称未实名认证
            injector.visibility(R.id.mine_user_name_tv, View.GONE);
        }
        if (StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 1 == data.getAuthStatus()) {//未设置昵称且实名认证
            view.setText(FormatUtils.nameTuomin(data.getName()));
        }
        if (!StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 1 == data.getAuthStatus()) {// 设置昵称且实名认证
            view.setText(String.format("%s(%s)", nickName, FormatUtils.nameTuomin(name)));
        }
        if (!StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 2 == data.getAuthStatus()) {//设置昵称未实名认证
            view.setText(nickName);
        }
        injector.text(R.id.mine_user_phone_tv, FormatUtils.phoneTuomin(phone));
    }
}
