import StringUtils from './StringUtils'
tuoMinPhone = (phone) => {
    if (StringUtils.isNoEmpty(phone) && phone.length == 11) {
        return phone.substring(0, 3) + '****' + phone.substring(7, 11)
    }
    return ''
};
bankCardEnd = (bankCard) => {
    if (StringUtils.isNoEmpty(bankCard)) {
        return bankCard.substring(bankCard.length - 4, bankCard.length);
    }
};


export default {
    tuoMinPhone,
    bankCardEnd,
}