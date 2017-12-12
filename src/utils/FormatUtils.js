import StringUtils from './StringUtils'
tuoMinPhone = (phone) => {
    if (StringUtils.isNoEmpty(phone) && phone.length == 11) {
        return phone.substring(0, 3) + '****' + phone.substring(7, 11)
    }
    return ''
}
bankCardEnd = (bankCard) => {
    if (StringUtils.isNoEmpty(bankCard)) {
        return bankCard.substring(bankCard.length - 4, bankCard.length);
    }
}

money=(amount)=>{
    let money=amount.toString()
    if(money.indexOf('.')>0){
        let moneyArr=money.split('.')
        if(moneyArr[1].length===0) return money+'00'
        if(moneyArr[1].length===1) return money+'0'
        if(moneyArr[1].length===2) return money
        if(moneyArr[1].length>2) return money.slice(0,4)
    }

    return money+'.00'

}


export default {
    tuoMinPhone,
    bankCardEnd,
    money,
}