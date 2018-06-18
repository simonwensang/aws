import {get, post} from "./action";
import Util from '../util/util';

export default {
  // 登录
   login(data) {
    return post('/login', data);
  },
  //创建用户
  createUserServer(data){
    let createUserData = Object.assign({},data);
     delete createUserData.checkPwd;
     console.log('CreateUserData',createUserData);
    return post('/userServer/createUserServer;JSESSIONID='+ Util.getUser(), createUserData);
  }

}
