package cn.neopay.walpay.android.module.activityParams;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by shangwf on 2017/9/12.
 */

public class RNActivityParams implements Parcelable {
    private String rnPage;


    public String getRnPage() {
        return rnPage;
    }

    public void setRnPage(String rnPage) {
        this.rnPage = rnPage;
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.rnPage);
    }

    public RNActivityParams() {
    }

    protected RNActivityParams(Parcel in) {
        this.rnPage = in.readString();
    }

    public static final Creator<RNActivityParams> CREATOR = new Creator<RNActivityParams>() {
        @Override
        public RNActivityParams createFromParcel(Parcel source) {
            return new RNActivityParams(source);
        }

        @Override
        public RNActivityParams[] newArray(int size) {
            return new RNActivityParams[size];
        }
    };
}
