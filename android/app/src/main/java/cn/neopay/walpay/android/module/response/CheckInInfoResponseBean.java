package cn.neopay.walpay.android.module.response;

/**
 * 获取签到信息结果
 */
public class CheckInInfoResponseBean extends BaseResponse {
	/**
	 * 总的签到积分
	 */
	private Integer totalScore;
	/**
	 * 总的签到次数
	 */
	private Integer checkInCount;


	public Integer getTotalScore() {
		return this.totalScore;
	}

	public void setTotalScore(Integer totalScore) {
		this.totalScore = totalScore;
	}

	public Integer getCheckInCount() {
		return this.checkInCount;
	}

	public void setCheckInCount(Integer checkInCount) {
		this.checkInCount = checkInCount;
	}
}
