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
  },
   //查询用户列表
  queryUserServer(data){
     console.log('queryUserServer',data);
    return post('/userServer/queryUserServer;JSESSIONID='+ Util.getUser(), data);
  },
   //编辑用户列表
  updateUserServer(data){
     console.log('updateUserServer',data);
    return post('/userServer/updateUserServer;JSESSIONID='+ Util.getUser(), data);
  },
   //删除用户列表
  deleteUserServer(data){
     console.log('deleteUserServer',data);
    return post('/userServer/deleteUserServer/'+data.id+';JSESSIONID='+ Util.getUser());
  },
  //订单列表查询
  queryOrder(data){
     console.log('queryOrder',data);
    return post('order/queryOrder;JSESSIONID='+ Util.getUser(),data);
  },
   //酒机列表查询
  queryAuditMachine(data){
     console.log('queryAuditMachine',data);
    return post('machine/queryAuditMachine;JSESSIONID='+ Util.getUser(),data);
  },
   //根据ID停用或者启用机器
  lockMachine(data){
     console.log('lockMachine',data);
    return post('machine/lockMachine/'+data.id+'/opt/'+data.opt+';JSESSIONID='+ Util.getUser(),data);
  },
  //根据ID绑定或者解绑商家和机器
  auditMachine(data){
     console.log('auditMachine',data);
    return post('machine/auditMachine/'+data.id+'opt/'+data.opt+';JSESSIONID='+ Util.getUser(),data);
  }

}
