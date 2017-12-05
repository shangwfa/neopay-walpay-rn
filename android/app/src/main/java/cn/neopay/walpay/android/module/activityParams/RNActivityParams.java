package cn.neopay.walpay.android.module.activityParams;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by shangwf on 2017/9/12.
 */

public class RNActivityParams implements Parcelable {
    private String page;
    private Data data;

    public static class Data implements Parcelable {
        private Boolean origin = true;
        private String packetCode;

        public String getPacketCode() {
            return packetCode;
        }

        public void setPacketCode(String packetCode) {
            this.packetCode = packetCode;
        }

        public Boolean getOrigin() {
            return origin;
        }

        public void setOrigin(Boolean origin) {
            this.origin = origin;
        }


        @Override
        public int describeContents() {
            return 0;
        }

        @Override
        public void writeToParcel(Parcel dest, int flags) {
            dest.writeString(this.packetCode);
            dest.writeValue(this.origin);
        }

        public Data() {
        }

        protected Data(Parcel in) {
            this.packetCode = in.readString();
            this.origin = (Boolean) in.readValue(Boolean.class.getClassLoader());
        }

        public static final Creator<Data> CREATOR = new Creator<Data>() {
            @Override
            public Data createFromParcel(Parcel source) {
                return new Data(source);
            }

            @Override
            public Data[] newArray(int size) {
                return new Data[size];
            }
        };
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.page);
        dest.writeParcelable(this.data, flags);
    }

    public RNActivityParams() {
    }

    protected RNActivityParams(Parcel in) {
        this.page = in.readString();
        this.data = in.readParcelable(Data.class.getClassLoader());
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
