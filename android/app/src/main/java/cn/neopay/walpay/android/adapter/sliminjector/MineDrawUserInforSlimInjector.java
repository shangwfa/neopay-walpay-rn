package cn.neopay.walpay.android.adapter.sliminjector;

import android.annotation.SuppressLint;
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
 * @describe MineDrawUserInforSlimInjector 我的抽屉 用户信息item
 */

public class MineDrawUserInforSlimInjector implements SlimInjector<UserInfoResponseBean> {
    @SuppressLint("ResourceType")
    @Override
    public void onInject(UserInfoResponseBean data, IViewInjector injector) {
        if (null == data) {
            return;
        }
        injector.with(R.id.img_mine_draw_bg_iv, view -> GlideManager.loadResImage((ImageView) view, R.mipmap.img_mine_draw_gif_bg));
        injector.with(R.id.mine_draw_user_avatar_iv, view -> {
            if (null == data.getAvatarUrl() || TextUtils.isEmpty(data.getAvatarUrl())) {
                GlideManager.loadLocalResImage((ImageView) view, R.mipmap.img_default_avater);
            } else {
                GlideManager.loadNetCircleImage((ImageView) view, data.getAvatarUrl());
            }
            view.setOnClickListener(v -> {
                RNActivityParams activityParams = new RNActivityParams();
                activityParams.setPage(RNActivity.PageType.PERSONAL_INFO_PAGE);
                MainRouter.getSingleton().jumpToRNPage(v.getContext(), activityParams);
            });
        });

        injector.with(R.id.mine_draw_user_name_tv, view -> setAuthStateShow(data, injector, (TextView) view))
                .with(R.id.mine_draw_go_auth_iv, view -> {
                    if (null == data.getAuthStatus()) {
                        return;
                    }
                    if (2 == data.getAuthStatus()) {//实名认证
                        view.setVisibility(View.GONE);
                        injector.background(R.id.mine_draw_auth_state_iv, R.mipmap.img_auth_tag);
                    }
                    if (1 == data.getAuthStatus()) {//未实名认证
                        view.setVisibility(View.VISIBLE);
                        injector.background(R.id.mine_draw_auth_state_iv, R.mipmap.img_not_auth_tag);
                        view.setOnClickListener(v -> RNActivity.jumpToRNPage(v.getContext(), RNActivity.PageType.USER_INFO_CERFITY));
                    }

                })
                .with(R.id.mine_draw_go_auth_two_iv, view -> view.setOnClickListener(v -> RNActivity.jumpToRNPage(v.getContext(), RNActivity.PageType.BIND_BANK_CARD)))
        ;
    }

    private void setAuthStateShow(UserInfoResponseBean data, IViewInjector injector, TextView view) {
        if (null == data) {
            return;
        }
        String nickName = StringUtils.authString(data.getNickName());
        String phone = StringUtils.authString(data.getPhone());
        String name = StringUtils.authString(data.getName());

        if (StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 1 == data.getAuthStatus()) {//未设置昵称未实名认证
            injector.visibility(R.id.mine_draw_auth_state_ll, View.GONE);
            injector.visibility(R.id.mine_draw_go_auth_two_iv, View.VISIBLE);
        }
        if (StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 2 == data.getAuthStatus()) {//未设置昵称且实名认证
            injector.visibility(R.id.mine_draw_auth_state_ll, View.VISIBLE);
            injector.visibility(R.id.mine_draw_go_auth_two_iv, View.GONE);
            view.setText(FormatUtils.nameTuomin(data.getName()));
        }
        if (!StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 2 == data.getAuthStatus()) {// 设置昵称且实名认证
            injector.visibility(R.id.mine_draw_auth_state_ll, View.VISIBLE);
            injector.visibility(R.id.mine_draw_go_auth_two_iv, View.GONE);
            view.setText(String.format("%s(%s)", nickName, name));
        }
        if (!StringUtils.isEmpty(nickName) && null != data.getAuthStatus() && 1 == data.getAuthStatus()) {//设置昵称未实名认证
            injector.visibility(R.id.mine_draw_auth_state_ll, View.VISIBLE);
            injector.visibility(R.id.mine_draw_go_auth_two_iv, View.GONE);
            view.setText(nickName);
        }
        if (StringUtils.isNotEmpty(phone)) {
            injector.visibility(R.id.mine_draw_user_phone_tv, View.VISIBLE)
                    .text(R.id.mine_draw_user_phone_tv, FormatUtils.phoneTuomin(phone));
        }

    }
}
