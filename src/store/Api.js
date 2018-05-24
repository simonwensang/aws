import {get, post} from "./action";

export default {
  // 登录
  login(data) {
    return post('/api/user/login', data);
  },
  // 注册
  reg(data) {
    return post('/api/user/registered', data);
  },
  // 退出
  loginout() {
    return post('/api/user/loginout', null);
  },
  // 获取用户信息
  getUserInfo() {
    return get('/api/user/getUserInfo', null);
  },
  // 获取账户概览信息
  getUserFinanceIndex() {
    return get('/api/user/finance/index');
  },
  // 获取手机校验码
  getPhoneCheckCode() {
    return post('/api/user/getPhoneCheckCode', null);
  },
  // 用户充值
  userPay(data) {
    return post('/api/user/pay', data);
  },
  // 用户修改密码
  userUpdatePwd(data) {
    return post('/api/user/updatePwd', data);
  },
  // 用户修改手机号
  userUpdatePhone(data) {
    return post('/api/user/updatePhone', data);
  },
  // 用户修改支付密码
  userUpdatePayPwd(data) {
    return post('/api/user/updatePayPwd', data);
  },
  // 获取邮箱校验码
  getMailCheckCode() {
    return post('/api/user/getMailCheckCode', null);
  },
  // 用户修改邮箱
  userUpdateMail(data) {
    return post('/api/user/updateMail', data);
  },

  // 分页获取用户消息列表信息
  queryUserMessage(data) {
    return post('/api/userMessage/queryUserMessage', data);
  },
  // 批量阅读消息
  userMessageRead(data) {
    return post('/api/userMessage/read', data);
  },
  // 批量删除用户消息
  userMessageDeleteUserMessage(data) {
    return post('/api/userMessage/deleteUserMessage', data);
  },
  // 根据用户消息内容ID获取用户消息内容信息
  getUserMessageContent(id) {
    return get('/api/userMessageContent/getUserMessageContent/'+ id);
  },

  // 获取收支明细
  getAccountDetail(data) {
    return post('/api/accountDetail/queryAccountDetail', data);
  },

  // 获取交易类型列表
  getTransactionTypeList() {
    return get('/api/common/transactionTypeList', null);
  },
  // 获取渠道类型列表
  getChannelTypeList() {
    return get('/api/common/channelTypeList', null);
  },
  // 获取渠道类型列表
  getOrderStatusList() {
    return get('/api/common/orderStatusList', null);
  },
  // 获取安全问题列表
  getSafetyProblemList() {
    return get('/api/common/safetyProblemList', null);
  },
  // 获取消息类型列表
  getMessageTypeList() {
    return get('/api/common/messageTypeList', null);
  },


  // 获取订单列表
  getOrders(data) {
    return post('/api/order/queryOrder', data);
  },
  // 获取订单详情
  getOrderDetail(orderNo) {
    return get('/api/order/getOrder/' + orderNo);
  },


  // 创建用户安全问题
  createUserSafetyProblems(data) {
    return post('/api/userSafetyProblems/createUserSafetyProblems', data);
  },
  // 修改用户安全问题
  updateUserSafetyProblems(data) {
    return post('/api/userSafetyProblems/updateUserSafetyProblems', data);
  },
  // 获取用户安全问题列表
  getUserSafetyProblemList() {
    return get('/api/userSafetyProblems/getUserSafetyProblemList', null);
  },


  // 获取折扣域名列表信息
  getDiscountList() {
    return get('/api/domain/getDiscountList', null);
  },
  // 获取域名列表信息
  domainQueryDomain(data) {
    return post('/api/domain/queryDomain', data);
  },
  // 查询域名
  domainSearchInfo(data) {
    return post('/api/domain/search/info', data);
  },
  // 查询域名状态
  domainSearchStatus(data) {
    return post('/api/domain/search/status', data);
  },
  // 域名支付
  domainPay(data) {
    return post('/api/domain/pay', data);
  },

  // 分页获取用户域名信息列表信息
  queryDomainUserInfo(data) {
    return post('/api/domainUserInfo/queryDomainUserInfo', data);
  },
  // 创建用户域名信息
  createDomainUserInfo(data) {
    return post('/api/domainUserInfo/createDomainUserInfo', data);
  },
  // 修改用户域名信息
  updateDomainUserInfo(data) {
    return post('/api/domainUserInfo/updateDomainUserInfo', data);
  },
  // 删除用户域名信息
  deleteDomainUserInfo(id) {
    return post('/api/domainUserInfo/deleteDomainUserInfo/' + id);
  },
  // 根据用户域名信息ID获取用户域名信息信息
  getDomainUserInfo(id) {
    return get('/api/domainUserInfo/getDomainUserInfo/'+id);
  },


  // 分页获取用户域名列表信息
  queryUserDomain(data) {
    return post('/api/userDomain/queryUserDomain', data);
  },
  // 根据id获取用户域名信息
  getDomainDetail(id) {
    return get('/api/userDomain/getUserDomain/' + id);
  },

  // 获取地址列表
  getAddressListByParentId(parentId) {
    return get('/api/address/getListByParentId/' + parentId);
  },





}
