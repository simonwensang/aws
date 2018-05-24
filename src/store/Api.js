import {get, post} from "./action";

export default {
  // 登录
   login(data) {
    return post('/api/user/getUserInfo', data);
  },

}
