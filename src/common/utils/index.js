/**
 * Created by soga on 2017/6/19.
 */

export const Util = {
    /**
     * 格式化请求url
     * @param url
     * @param data
     * @returns {*}
     */
    formatHttpUrl : function(url, data) {
        for (let p in data) {
            if (data.hasOwnProperty(p)) {
                let reg = RegExp('<#=' + p + '#>', 'g');
                url = url.replace(reg, data[p])
            }
        }
        return url
    }
}