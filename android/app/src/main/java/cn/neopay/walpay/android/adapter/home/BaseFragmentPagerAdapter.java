package cn.neopay.walpay.android.adapter.home;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.xgjk.common.lib.base.BaseFragment;

import java.util.List;

/**
 * Created by shangwf on 2017/5/3.
 */

public class BaseFragmentPagerAdapter extends FragmentPagerAdapter {
    private final List<BaseFragment> mFragments;


    private String[] mTitle;

    public BaseFragmentPagerAdapter(FragmentManager fm, List<BaseFragment> fragments) {
        super(fm);
        this.mFragments = fragments;
    }


    public BaseFragmentPagerAdapter(FragmentManager fm, List<BaseFragment> fragments, String[] title) {
        super(fm);
        this.mFragments = fragments;
        this.mTitle = title;
    }

    @Override
    public Fragment getItem(int position) {

        return mFragments.get(position);
    }

    @Override
    public int getCount() {
        return mFragments.size();
    }

    @Override
    public CharSequence getPageTitle(int position) {
        if (mTitle == null || mTitle.length == 0) {
            return "";
        }
        return mTitle[position];
    }

}

