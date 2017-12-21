package cn.neopay.walpay.android.module.sliminjector;

import android.view.View;

import java.math.BigDecimal;

/**
 * @author carlos.guo
 * @date 2017/10/18
 * @describe NewsRedPacketItemBean
 * //TODO 模拟news bean 数据
 */

public class NewsRedPacketItemBean {
    /**
     * msgType : 1
     * msgTypeText : 红包消息
     * dayCode : 20171029
     * disPlayDate : true
     * id : 100
     * packetCode : 21f9b9bdd5fe4221808dd0b631fc44e4
     * uuid : AnJ8xUoCkpVccr0Z
     * readStatus : 2
     * receiveStatus : 4
     * bossName : 红包老板名称
     * message : test
     * themeType : 1
     * themeTypeText : 普通
     * themeName : 生日
     * themeUrl : https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2516037300,2879226066&fm=27&gp=0.jpg
     * createTime : 2017-10-29 10:59:15
     * createTimeMs : 1509245955000
     * luckyAmount: 0
     */

    private int msgType;
    private String msgTypeText;
    private String dayCode;
    private boolean disPlayDate;
    private long id;
    private String packetCode;
    private String uuid;
    private int readStatus;
    private int receiveStatus;
    private String bossName;
    private String message;
    private int themeType;
    private String themeTypeText;
    private String themeName;
    private String themeUrl;
    private String createTime;
    private long createTimeMs;
    private BigDecimal luckyAmount;
    private View.OnClickListener onClickListener;

    public View.OnClickListener getOnClickListener() {
        return onClickListener;
    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    public BigDecimal getLuckyAmount() {
        return luckyAmount;
    }

    public void setLuckyAmount(BigDecimal luckyAmount) {
        this.luckyAmount = luckyAmount;
    }

    public int getMsgType() {
        return msgType;
    }

    public void setMsgType(int msgType) {
        this.msgType = msgType;
    }

    public String getMsgTypeText() {
        return msgTypeText;
    }

    public void setMsgTypeText(String msgTypeText) {
        this.msgTypeText = msgTypeText;
    }

    public String getDayCode() {
        return dayCode;
    }

    public void setDayCode(String dayCode) {
        this.dayCode = dayCode;
    }

    public boolean isDisPlayDate() {
        return disPlayDate;
    }

    public void setDisPlayDate(boolean disPlayDate) {
        this.disPlayDate = disPlayDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPacketCode() {
        return packetCode;
    }

    public void setPacketCode(String packetCode) {
        this.packetCode = packetCode;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getReadStatus() {
        return readStatus;
    }

    public void setReadStatus(int readStatus) {
        this.readStatus = readStatus;
    }

    public int getReceiveStatus() {
        return receiveStatus;
    }

    public void setReceiveStatus(int receiveStatus) {
        this.receiveStatus = receiveStatus;
    }

    public String getBossName() {
        return bossName;
    }

    public void setBossName(String bossName) {
        this.bossName = bossName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getThemeType() {
        return themeType;
    }

    public void setThemeType(int themeType) {
        this.themeType = themeType;
    }

    public String getThemeTypeText() {
        return themeTypeText;
    }

    public void setThemeTypeText(String themeTypeText) {
        this.themeTypeText = themeTypeText;
    }

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }

    public String getThemeUrl() {
        return themeUrl;
    }

    public void setThemeUrl(String themeUrl) {
        this.themeUrl = themeUrl;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public long getCreateTimeMs() {
        return createTimeMs;
    }

    public void setCreateTimeMs(long createTimeMs) {
        this.createTimeMs = createTimeMs;
    }
}
