package cn.neopay.walpay.android.module.response;

/**
 * 签到列表结果
 */
public class CheckInResponseBean extends BaseResponse {
	/**
	 * 签到积分
	 */
	private Integer score;
	/**
	 * 签到时间
	 */
	private String checkInTime;
	/**
	 * 签到时间
	 */
	private Long checkInTimeMs;


	public Integer getScore() {
		return this.score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public String getCheckInTime() {
		return this.checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public Long getCheckInTimeMs() {
		return this.checkInTimeMs;
	}

	public void setCheckInTimeMs(Long checkInTimeMs) {
		this.checkInTimeMs = checkInTimeMs;
	}
}
