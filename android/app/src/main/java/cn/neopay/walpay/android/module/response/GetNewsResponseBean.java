package cn.neopay.walpay.android.module.response;

import java.math.BigDecimal;

/**
 * @author carlos.guo
 * @date 2017/11/24
 * @describe 获取首页消息页面
 */

public class GetNewsResponseBean {

    /**
     * msgType : 2
     * msgTypeText : 支付消息
     * dayCode : 20171121
     * disPlayDate : true
     * id : 134
     * uuid : AnJ8xUoCkpVccr0Z
     * billId : 1
     * amount : 49.5
     * payNoticeType : 4
     * payNoticeTypeText : 手机充值付款成功
     * phone : 13727284751
     * tradType : 13
     * tradTypeText : 手机充值
     * productDesc : 手机话费50
     * payDirection : 2
     * payDirectionText : 付款
     * readStatus : 2
     * readStatusText : 未读
     * deleteStatus : 2
     * deleteStatusText : 无效
     * createTime : 2017-11-21 21:11:12
     * createTimeMs : 1511269872000
     * updateTime : 2017-11-21 21:11:12
     * updateTimeMs : 1511269872000
     * packetCode : 21f9b9bdd5fe4221808dd0b631fc44e4
     * receiveStatus : 4
     * bossName : 红包老板名称
     * message : test
     * themeType : 1
     * themeTypeText : 普通
     * themeName : 生日
     * themeUrl : https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2516037300,2879226066&fm=27&gp=0.jpg
     * noticeType : 1
     * noticeTypeText : 话费
     * title : 充值到账成功
     * content : 到账金额100元
     * payTypeDesc : 中国建设银行0625
     * noticeImageUrl : http://www.baidu.com
     * noticeUrl : http://www.baidu.com
     * noticeContent : 测试数据
     * raedStatus : 2
     * luckyAmount:2
     * iconUrl:""
     * contentString
     */

    private int msgType;
    private String msgTypeText;
    private String dayCode;
    private boolean disPlayDate;
    private int id;
    private String uuid;
    private int billId;
    private double amount;
    private int payNoticeType;
    private String payNoticeTypeText;
    private String phone;
    private int tradType;
    private String tradTypeText;
    private String productDesc;
    private int payDirection;
    private String payDirectionText;
    private int readStatus;
    private String readStatusText;
    private int deleteStatus;
    private String deleteStatusText;
    private String createTime;
    private long createTimeMs;
    private String updateTime;
    private long updateTimeMs;
    private String packetCode;
    private int receiveStatus;
    private String bossName;
    private String message;
    private int themeType;
    private String themeTypeText;
    private String themeName;
    private String themeUrl;
    private int noticeType;
    private String noticeTypeText;
    private String title;
    private String content;
    private String payTypeDesc;
    private String noticeImageUrl;
    private String noticeUrl;
    private String noticeContent;
    private String iconUrl;
    private String contentString;
    private int raedStatus;
    private BigDecimal luckyAmount;

    public String getContentString() {
        return contentString;
    }

    public void setContentString(String contentString) {
        this.contentString = contentString;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getPayNoticeType() {
        return payNoticeType;
    }

    public void setPayNoticeType(int payNoticeType) {
        this.payNoticeType = payNoticeType;
    }

    public String getPayNoticeTypeText() {
        return payNoticeTypeText;
    }

    public void setPayNoticeTypeText(String payNoticeTypeText) {
        this.payNoticeTypeText = payNoticeTypeText;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getTradType() {
        return tradType;
    }

    public void setTradType(int tradType) {
        this.tradType = tradType;
    }

    public String getTradTypeText() {
        return tradTypeText;
    }

    public void setTradTypeText(String tradTypeText) {
        this.tradTypeText = tradTypeText;
    }

    public String getProductDesc() {
        return productDesc;
    }

    public void setProductDesc(String productDesc) {
        this.productDesc = productDesc;
    }

    public int getPayDirection() {
        return payDirection;
    }

    public void setPayDirection(int payDirection) {
        this.payDirection = payDirection;
    }

    public String getPayDirectionText() {
        return payDirectionText;
    }

    public void setPayDirectionText(String payDirectionText) {
        this.payDirectionText = payDirectionText;
    }

    public int getReadStatus() {
        return readStatus;
    }

    public void setReadStatus(int readStatus) {
        this.readStatus = readStatus;
    }

    public String getReadStatusText() {
        return readStatusText;
    }

    public void setReadStatusText(String readStatusText) {
        this.readStatusText = readStatusText;
    }

    public int getDeleteStatus() {
        return deleteStatus;
    }

    public void setDeleteStatus(int deleteStatus) {
        this.deleteStatus = deleteStatus;
    }

    public String getDeleteStatusText() {
        return deleteStatusText;
    }

    public void setDeleteStatusText(String deleteStatusText) {
        this.deleteStatusText = deleteStatusText;
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

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public long getUpdateTimeMs() {
        return updateTimeMs;
    }

    public void setUpdateTimeMs(long updateTimeMs) {
        this.updateTimeMs = updateTimeMs;
    }

    public String getPacketCode() {
        return packetCode;
    }

    public void setPacketCode(String packetCode) {
        this.packetCode = packetCode;
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

    public int getNoticeType() {
        return noticeType;
    }

    public void setNoticeType(int noticeType) {
        this.noticeType = noticeType;
    }

    public String getNoticeTypeText() {
        return noticeTypeText;
    }

    public void setNoticeTypeText(String noticeTypeText) {
        this.noticeTypeText = noticeTypeText;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPayTypeDesc() {
        return payTypeDesc;
    }

    public void setPayTypeDesc(String payTypeDesc) {
        this.payTypeDesc = payTypeDesc;
    }

    public String getNoticeImageUrl() {
        return noticeImageUrl;
    }

    public void setNoticeImageUrl(String noticeImageUrl) {
        this.noticeImageUrl = noticeImageUrl;
    }

    public String getNoticeUrl() {
        return noticeUrl;
    }

    public void setNoticeUrl(String noticeUrl) {
        this.noticeUrl = noticeUrl;
    }

    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }

    public int getRaedStatus() {
        return raedStatus;
    }

    public void setRaedStatus(int raedStatus) {
        this.raedStatus = raedStatus;
    }
}
