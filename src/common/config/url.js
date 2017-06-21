/**
 * Created by soga on 2017/6/19.
 */

export const SERVER = "";

//请求的url
export const HTTP_SERVER = {
    getMusicList                   : {url: `http://tingapi.ting.baidu.com/v1/restserver/ting?xml&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=<#=typeId#>&size=100&offset=0`, method: 'GET',}, //登陆
}

/**
 * 扩展string,用来格式化请求链接
 * @param data
 * @returns {*}
 */
String.prototype.formatHttpUrl = function (data) {
    let url = this;
    console.log(url)
    for (let p in data) {
        if (data.hasOwnProperty(p)) {
            let reg = RegExp('<#=' + p + '#>', 'g');
            url = url.replace(reg, data[p])
        }
    }
    return url
}
