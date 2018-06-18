
import Notice from 'iview/src/components/notice';
import Crypto from 'crypto';
export default {
    /**
     * 通知框
     * @param {*} type success成功
     *                  warning警告
     *                  error错误
     *                  info信息
     * @param {*} content
     */
    showNotificationBox(type, content) {
        if (type == 'success') {
            Notice.success({
                title: content,
                duration: 3
            });
        } else if (type == 'warning') {
            Notice.warning({
                title: content,
                duration: 3
            });
        } else if (type == 'error') {
            Notice.error({
                title: content,
                duration: 3
            });
        } else {
            Notice.info({
                title: content,
                duration: 3
            });
        }
    },
    /**
   * 毫秒转换时间格式
   * mill 传入毫秒
   * str 分隔符  -   /  时分秒
   */
  transformTime(mill, str){
    let refTime;
    if (mill) {
      let mill2 = parseInt(mill);
      let timem = new Date(mill2);
      let y = timem.getFullYear(),
        m = (timem.getMonth() + 1) < 10 ? '0' + (timem.getMonth() + 1) : (timem.getMonth() + 1),
        d = timem.getDate() < 10 ? '0' + timem.getDate() : timem.getDate(),
        h = timem.getHours() < 10 ? '0' + timem.getHours() : timem.getHours(),
        f = timem.getMinutes() < 10 ? '0' + timem.getMinutes() : timem.getMinutes(),
        s = timem.getSeconds() < 10 ? '0' + timem.getSeconds() : timem.getSeconds();

      if (!!str) {
        if (str == "cn") {
          refTime = y + "年" + m + "月" + d + "日 " + h + "时" + f + "分" + s + "秒";
        } else {
          refTime = y + str + m + str + d + " " + h + ":" + f + ":" + s;
        }
      } else {
        refTime = y + '-' + m + '-' + d + " " + h + ":" + f + ":" + s;
      }
    } else {
      refTime = "-"
    }


    return refTime;
  },
  setUser(user) {
    console.log('user',user)
    sessionStorage.setItem("auto-wine_cloud_user", window.JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(sessionStorage.getItem("auto-wine_cloud_user"));
  },
  md5String(text) {
    var md5 = Crypto.createHash("md5");
    md5.update(text);
    return md5.digest('hex');
  },

  getAllDay(day) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
    return [start, end];
  }
}
