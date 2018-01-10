/**
 * @author: carlos.guo
 * @data:  2017/11/20.
 * @description: 状态设置器--工具类
 */
/**************************************状态设置器************************************/
commSetState = (that, states, callback) => {
    that.setState(states, callback)
};
commState = (that, states) => {
    that.state(states)
};
export default {
    commState,
    commSetState,
}