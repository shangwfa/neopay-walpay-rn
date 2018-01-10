/**
 * @author: carlos.guo
 * @data:  2017/11/20.
 * @description: 日志管理器--工具类
 */
/**************************************日志管理器************************************/

const TAG = "LoggerUtils";
let IS_DEV = true;
const CLEAR = () => {
};
/**
 * @return 清空LoggerUtils所有的日志
 */
initLoggerUtils = () => {
    IS_DEV = false;
};
/**
 * @return 清空所有的日志
 */
initLogger = () => {
    if (!__DEV__) {
        global.console = {
            info: () => {
            },
            log: () => {
            },
            warn: () => {
            },
            error: () => {
            },
        };
    }
};
/**
 * @returns log()
 * @param msg
 */
l = (msg) => {
    IS_DEV ? console.log(`log-${TAG}: ${msg}`) : CLEAR;
};
/**
 * @returns info()
 * @param msg
 */
i = (msg) => {
    IS_DEV ? console.info(`info-${TAG}: ${msg}`) : CLEAR;
};
/**
 * @returns warn()
 * @param msg
 */
w = (msg) => {
    IS_DEV ? console.warn(`warn-${TAG}: ${msg}`) : CLEAR;
};
/**
 * @returns error()
 * @param msg
 */
e = (msg) => {
    IS_DEV ? console.error(`error-${TAG}: ${msg}`) : CLEAR;
};

export default {
    initLogger,
    initLoggerUtils,
    l,
    i,
    w,
    e,
}