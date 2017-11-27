export default {
  //获取最大值
  getMaxValue: function(arr) {
    return Math.max.apply(Math, arr);
  },
  //获取最小值
  getMinValue: function(arr) {
    return Math.min.apply(Math, arr);
  }
}
