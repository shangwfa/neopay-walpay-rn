isEmpty = (input) => {
    return input == null || input == ''
}

isNoEmpty = (input) => {
    return !isEmpty(input)
}

trim = (input) => {
    input.replace(/^\s+|\s+$/, '')
}

startsWith = (input, prefix) => {
    return input.indexOf(prefix) === 0;
}

endsWith = (input, suffix) => {
    return input.lastIndexOf(suffix) === 0;
}

equals = (input1, input2) => {
    return input1 == input2
}

equalsIgnoreCase = (input1, input2) => {
    return input1.toLocaleLowerCase() == input2.toLocaleLowerCase()
}

contains = (input, searchSeq) => {
    return input.indexOf(searchSeq) >= 0
}

containsWhitespace = (input) => {
    return this.contains(input, ' ')
}

deleteWhitespace = (input) => {
    return input.replace(/\s+/g, '')
}

//只包含字母
isAlpha = (input) => {
    return /^[a-z]+$/i.test(input)
}

//只包含字母、空格
isAlphaSpace = (input) => {
    return /^[a-z\s]*$/i.test(input)
}

//只包含字母、数字
isAlphanumeric = (input) => {
    return /^[a-z0-9]+$/i.test(input)
}

//只包含字母、数字和空格
isAlphanumericSpace = (input) => {
    return /^[a-z0-9\s]*$/i.test(input)
}

//数字
isNumeric = (input) => {
    return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input)
}

//小数
isDecimal = (input) => {
    return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input)
}

isContainChildrenStr = (str, childrenStr) => {
    return str.indexOf(childrenStr) >= 0;
}

phoneTuoMi = (phone) => {
    return `${StringUtils.isEmpty(phone) && phone.length === 11 ? phone.substring(0, 3) + "****" + phone.substring(phone.length - 4, phone.length) : ""}`;
}

import StringUtils from './StringUtils'
export default {
    isEmpty,
    isNoEmpty,
    trim,
    startsWith,
    endsWith,
    equals,
    equalsIgnoreCase,
    contains,
    containsWhitespace,
    deleteWhitespace,
    isAlpha,
    isAlphaSpace,
    isAlphanumeric,
    isAlphanumericSpace,
    isNumeric,
    isDecimal,
    isContainChildrenStr,
    phoneTuoMi,
}