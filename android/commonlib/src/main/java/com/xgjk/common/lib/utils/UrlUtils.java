package com.xgjk.common.lib.utils;

import android.text.TextUtils;
import android.util.Pair;

import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by shangwf on 2017/4/29.
 */

public class UrlUtils {
    /***
     * Url拼接整理类
     */
    public static class UrlWrapper {

        private final String host;
        private final List<Pair<String, String>> params;

        public UrlWrapper(String url) {
            this.host = makeHost(url);
            this.params = makeParams(url);
        }

        private String makeHost(final String url) {
            if (url != null) {
                final int index = url.indexOf('?');
                if (index >= 0) {
                    return url.substring(0, index);
                }
                return url;
            }
            return url;
        }

        private List<Pair<String, String>> makeParams(final String url) {
            final List<Pair<String, String>> list = new LinkedList<Pair<String, String>>();
            if (url != null) {
                final String[] splits = url.split("\\?|\\&");

                if (splits != null && splits.length > 0) {

                    /***
                     * i = 0 => host
                     */
                    for (int i = 1; i < splits.length; i++) {
                        final String text = splits[i];
                        final Pair<String, String> pair = makePair(text);

                        if (checkParam(pair)) {
                            list.add(pair);
                        }
                    }
                }
            }

            return list;
        }

        /***
         * 生成一个pair
         * @param text
         * @return
         */
        private  Pair<String, String> makePair(final String text) {
            if (text != null) {
                final int index = text.indexOf('=');
                if (index >= 0) {
                    final String key = text.substring(0, index);
                    final String value = text.substring(index + 1);
                    final Pair<String, String> pair = new Pair<String, String>(key, value);
                    return pair;
                } else {
                    //
                    final Pair<String, String> pair = new Pair<String, String>(text, "");
                    return pair;
                }
            }
            return null;
        }

        /***
         * 增加参数
         *
         * @param param
         */
        public boolean addParam(Pair<String, String> param) {
            if (checkParam(param)) {
                return params.add(param);
            } else {
                return false;
            }
        }

        /***
         * 检查参数是否有效
         *
         * @param param
         * @return
         */
        private boolean checkParam(Pair<String, String> param) {
            return !(param == null || TextUtils.isEmpty(param.first));
        }

        /***
         * @param key
         * @return 返回对应的key的所有参数
         */
        public List<Pair<String, String>> getParams(String key) {
            List<Pair<String, String>> list = new LinkedList<Pair<String, String>>();
            if (key != null) {
                Iterator<Pair<String, String>> it = params.iterator();
                for (; it.hasNext(); ) {
                    final Pair<String, String> pair = it.next();
                    if (key.equals(pair.first)) {
                        list.add(pair);
                    }
                }
            }

            return list;
        }


        /***
         * @param key
         * @return 删除的个数
         */
        public int removeParams(String key) {
            int count = 0;
            if (key != null) {
                Iterator<Pair<String, String>> it = params.iterator();
                for (; it.hasNext(); ) {
                    final Pair<String, String> pair = it.next();
                    if (key.equals(pair.first)) {
                        it.remove();
                        count++;
                    }
                }
            }
            return count;
        }

        /***
         * 排序参数列表
         */
        public void sortParams() {
            Collections.sort(params, new Comparator<Pair<String, String>>() {
                @Override
                public int compare(final Pair<String, String> t0, final Pair<String, String> t1) {
                    if (t0 == null || t0.first == null) {
                        return -1;
                    }

                    if (t1 == null || t1.first == null) {
                        return 1;
                    }

                    if (t0.first.startsWith("#")) {
                        return 1;
                    }

                    if (t1.first.startsWith("#")) {
                        return -1;
                    }

                    return t0.first.compareTo(t1.first);
                }
            });
        }


        /***
         * @return 重新拼装成标准化的URL
         */
        @Override
        public String toString() {

            final StringBuilder stringBuilder = new StringBuilder(host);

            boolean firstAppend = true;

            Iterator<Pair<String, String>> it = params.iterator();
            for (; it.hasNext(); ) {
                final Pair<String, String> pair = it.next();
                if (checkParam(pair)) {
                    if (firstAppend) {
                        stringBuilder.append("?");
                        firstAppend = false;
                    } else {
                        stringBuilder.append("&");
                    }

                    if (TextUtils.isEmpty(pair.second)) {
                        if (pair.first != null && pair.first.startsWith("#")) {
                            stringBuilder.append(pair.first);
                        } else {
                            stringBuilder.append(pair.first).append("=");
                        }
                    } else {
                        stringBuilder.append(pair.first).append("=").append(pair.second);
                    }
                }
            }

            return stringBuilder.toString();
        }
    }
}
