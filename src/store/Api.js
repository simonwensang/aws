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
  bindMachine(data){
     console.log('bindMachine',data);
    return post('machine/bindMachine/'+data.id+'/opt/'+data.opt+';JSESSIONID='+ Util.getUser(),data);
  },
  //创建品牌
  createBrand(data){
    let createUserData = Object.assign({},data);
     delete createUserData.checkPwd;
     console.log('createBrand',createUserData);
    return post('/brand/createBrand;JSESSIONID='+ Util.getUser(), createUserData);
  },
   //查询品牌列表
  queryBrand(data){
     console.log('queryBrand',data);
    return post('/brand/queryBrand;JSESSIONID='+ Util.getUser(), data);
  },
   //编辑品牌列表
  updateBrand(data){
     console.log('updateBrand',data);
    return post('/brand/updateBrand;JSESSIONID='+ Util.getUser(), data);
  },
   //删除品牌列表
  deleteBrand(data){
     console.log('deleteBrand',data);
    return post('/brand/deleteBrand/'+data.id+';JSESSIONID='+ Util.getUser());
  },
  //创建产品
  createProduct(data){
    let createUserData = Object.assign({},data);
     delete createUserData.checkPwd;
     console.log('createProduct',createUserData);
    return post('/product/createProduct;JSESSIONID='+ Util.getUser(), createUserData);
  },
   //查询产品列表
  queryProduct(data){
     console.log('queryProduct',data);
    return post('/product/queryProduct;JSESSIONID='+ Util.getUser(), data);
  },
   //编辑产品列表
  updateProduct(data){
     console.log('updateProduct',data);
    return post('/product/updateProduct;JSESSIONID='+ Util.getUser(), data);
  },
   //删除产品列表
  deleteProduct(data){
     console.log('deleteProduct',data);
    return post('/product/deleteProduct/'+data.id+';JSESSIONID='+ Util.getUser());
  },
   //根据id获取产品详情
  getProduct(data){
     console.log('deleteProduct',data);
    return get('/product/getProduct/'+data+';JSESSIONID='+ Util.getUser());
  },
  //创建sku
  createSku(data){
    let createSkuData = Object.assign({},data);
     delete createSkuData.checkPwd;
     console.log('createSku',createSkuData);
    return post('/sku/createSku;JSESSIONID='+ Util.getUser(), createSkuData);
  },
   //查询sku列表
  querySku(data){
     console.log('querySku',data);
    return post('/sku/querySku;JSESSIONID='+ Util.getUser(), data);
  },
   //编辑sku列表
  updateSku(data){
     console.log('updateSku',data);
    return post('/sku/updateSku;JSESSIONID='+ Util.getUser(), data);
  },
   //删除sku列表
  deleteSku(data){
     console.log('deleteSku',data);
    return post('/sku/deleteSku/'+data.id+';JSESSIONID='+ Util.getUser());
  },
   //根据id获取sku详情
  getSku(data){
     console.log('getSku',data);
    return get('/sku/getSku/'+data+';JSESSIONID='+ Util.getUser());
  },
   //根据id获取厂家详情
  getUserServer(data){
     console.log('getUserServer',data);
    return get('/userServer/getUserServer/'+data+';JSESSIONID='+ Util.getUser());
  },
}
