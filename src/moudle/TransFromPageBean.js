/**
 * @author: carlos.guo
 * @data:  2017/10/25.
 * @description: 交易详情--bean
 */
export class TransFromPageBean {
    _transformType;
    _transformContent;
    _isShowArrows;

    get transformType() {
        return this._transformType;
    }

    set transformType(value) {
        this._transformType = value;
    }

    get transformContent() {
        return this._transformContent;
    }

    set transformContent(value) {
        this._transformContent = value;
    }

    get isShowArrows() {
        return this._isShowArrows;
    }

    set isShowArrows(value) {
        this._isShowArrows = value;
    }
}
