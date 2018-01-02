/**
 * @author: carlos.guo
 * @data:  2017/11/20.
 * @description: 时间--工具类
 */

/**************************************时间格式化处理************************************/


/**
 * @param dateStr 字符串格式为 2017-02-10 18:20:30
 * 注意：此处月、日、时分秒、必须为2位数字，否则报错
 * @returns 时间戳
 */
getTimestamp = (dateStr) => {
    return Date.parse(new Date(dateStr));
};


/**
 * @param fmt  时间格式 ("yyyy-MM-dd"、"yyyy-MM-dd HH:mm:ss")
 * @param date  Date()
 * @returns 对应的时间格式 2014-04-01 、2014-01-01 01:20:20
 */
dateFmt = (fmt = "yyyy-MM-dd", date = new Date()) => {
    let dateType = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "H+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }
    for (let k in dateType)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (1 === RegExp.$1.length) ?
                (dateType[k]) : (("00" + dateType[k]).substr(("" + dateType[k]).length)));
    return fmt;
};
/**
 * @param date Date()
 * @returns  true/false 是否是昨天
 */
isYesterday = (date = new Date()) => {
    let currentDate = (new Date());//当前时间
    let today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime(); //今天凌晨
    let yesterday = new Date(today - 24 * 3600 * 1000).getTime();
    return (date.getTime() < today && yesterday <= date.getTime());
};
/**
 * @param date Date()
 * @returns  true/false 是否是今天
 */
isToday = (date = new Date()) => {
    return (new Date().toDateString() === date.toDateString());
};
/**
 * @param date Date()
 * @returns  true/false 是否是今年
 */
isToYear = (date = new Date()) => {
    return (new Date().getYear() === date.getYear());
};

/**
 * @param timestamp
 * @returns 最近的时间日期 (20分钟前、11:43、昨天11:14、11-14 11：20 、2017-11-14 11：20)
 */
getRecentDate = (timestamp) => {
    let date = new Date(timestamp);
    if (isToday(date)) {//当天
        let nowDate = new Date();
        console.log(nowDate.getTime() + '~~~~~~' + timestamp);
        let con = (nowDate.getTime() - timestamp) / 1000 / 60;
        return con <= 59 ? `${Math.ceil(con)}分钟前` : dateFmt("HH:mm", date);
    } else if (isYesterday(date)) {//昨天
        return `昨天${dateFmt("HH:mm", date)}`;
    } else if (isToYear(date)) {//今年
        return dateFmt("MM-dd HH:mm", date);
    } else {//其他
        return dateFmt("yyyy-MM-dd HH:mm", date)
    }
};
/**
 * @param timestamp
 * @returns 最近的时间日期 (今天 09-01 2016-09-09)
 */
getPhoneTopupMsgDate = (timestamp) => {
    let date = new Date(timestamp);
    if (isToday(date)) {//当天
        return `今天`;
    } else if (isToYear(date)) {//今年
        return dateFmt("MM-dd", date);
    } else {//其他
        return dateFmt("yyyy-MM-dd", date)
    }
};
/**
 * @param timestamp
 * @returns 最近的时间日期 (本月 09 2016-09-09)
 */
getRpRecordList = (timestamp) => {
    let date = new Date(timestamp);
    if (isToYearAndMonth(date)) {//当月
        return `本月`;
    } else if (isToYear(date)) {//今年
        if (dateFmt("MM", date) == '10' || dateFmt("MM", date) == '11' || dateFmt("MM", date) == '12') {
            return dateFmt("MM" + '月', date);
        } else {
            return dateFmt("M" + '月', date);
        }
    } else {//其他
        return dateFmt("yyyy-MM", date)
    }
};

mmDdHhMmDateFmt = (timestamp) => {
    return dateFmt("MM-dd HH:mm", new Date(timestamp))
};

isToYearAndMonth = (date) => {
    return isToYear(date) && (new Date().getMonth() === date.getMonth())
};

yyyyYearMmMonth = (timestamp) => {
    let date = new Date(timestamp);
    if (isToYearAndMonth(date)) {
        return '本月'
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
};

export default {
    isYesterday,
    isToday,
    isToYear,
    dateFmt,
    getRecentDate,
    getTimestamp,
    mmDdHhMmDateFmt,
    yyyyYearMmMonth,
    getPhoneTopupMsgDate,
    getRpRecordList,
}

