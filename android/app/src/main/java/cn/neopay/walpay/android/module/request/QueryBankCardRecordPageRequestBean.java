package cn.neopay.walpay.android.module.request;

/**
 * 查询银行卡交易记录参数
 */
public class QueryBankCardRecordPageRequestBean extends BaseRequest {
	/**
	 * 页码
	 */
	private Integer pageNo;
	/**
	 * 分页单位
	 */
	private Integer pageSize;
	/**
	 * 银行卡id
	 */
	private Long bankCardId;


	public Integer getPageNo() {
		return this.pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Long getBankCardId() {
		return this.bankCardId;
	}

	public void setBankCardId(Long bankCardId) {
		this.bankCardId = bankCardId;
	}
}
