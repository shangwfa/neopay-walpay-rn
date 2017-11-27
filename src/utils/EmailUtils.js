export default {
  emailRegexs: {
    EMAIL_PATTERN: /^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/i
  },
  //邮箱格式校验
  isEmail: function(input) {
    return this.EMAIL_PATTERN.test(input);
  }
}
