<style rel="stylesheet/scss" scoped>
  .safe-list {
    padding: 33px;
    border-top: 1px dashed #e1e6eb;
  }

  .secure-level {
    margin-top: 40px;
    margin-bottom: 30px;
  }

  .set-list-left {
    width: 140px;
    font-weight: bold;
  }

  .set-list-right {
    width: 150px;
  }

  .set-list-mid {
    overflow: hidden;
  }

</style>
<template>
  <div style="background: #fff;" class="pl20 pr20">
    <div v-title>安全设置</div>
    <p class="pt20 pb10">登录账户：{{userNickName}}</p>
    <p class="mt10 pb20" style="border-bottom: 1px solid #e1e6eb;">注册时间：{{createTime}}</p>
    <Row class="secure-level">
      <div class="fl">您当前的账号安全程度</div>
      <Progress class="fl" style="width: 200px;margin-left: 30px;" :stroke-width="20" :percent="percent" :status="status"
                hide-info></Progress>
      <div class="fl ml20">安全级别: <span :class="safeLevelClass">{{safeLevelText}}</span></div>
      <div class="fl ml20">{{tipText}}</div>
    </Row>
    <Row class="safe-list">
      <div class="fl set-list-left">登录密码</div>
      <div class="fr set-list-right">
        <span class="text-success">
          <Icon type="checkmark-round"></Icon>
          <span class="ng-binding">已设置</span></span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/pwd'">修改</router-link></span>
      </div>
      <div class="set-list-mid">安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</div>
    </Row>


    <Row v-if="userPhoneFlag" class="safe-list">
      <div class="fl set-list-left">手机绑定</div>
      <div class="fr set-list-right">
        <span class="text-success">
          <Icon type="checkmark-round"></Icon>
          <span>已设置</span>
        </span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/phone'">修改</router-link></span>
      </div>
      <div class="set-list-mid">您已绑定了手机 <span class="text-success">{{userPhone}}</span> [您的手机号可以直接用于登录、找回密码等]</div>
    </Row>
    <Row v-else class="safe-list">
      <div class="fl set-list-left">手机绑定</div>
      <div class="fr set-list-right">
        <span class="text-warning">
          <Icon type="close-round"></Icon>
          <span class="ng-binding">未设置</span>
        </span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/phone'">设置</router-link></span>
      </div>
      <div class="set-list-mid">是您找回登录密码的方式之一。建议您设置手机号，更有效保障您的密码安全。</div>
    </Row>


    <Row v-if="userMailFlag" class="safe-list">
      <div class="fl set-list-left">邮箱绑定</div>
      <div class="fr set-list-right">
        <span class="text-success">
          <Icon type="checkmark-round"></Icon>
          <span class="ng-binding">已设置</span>
        </span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/mail'">修改</router-link></span>
      </div>
      <div class="set-list-mid">您已绑定了邮箱 <span class="text-success">{{userMail}}</span> [您的邮箱账号可以直接用于登录、找回密码等]</div>
    </Row>
    <Row v-else class="safe-list">
      <div class="fl set-list-left">邮箱绑定</div>
      <div class="fr set-list-right">
        <span class="text-warning">
          <Icon type="close-round"></Icon>
          <span class="ng-binding">未设置</span></span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/mail'">设置</router-link></span>
      </div>
      <div class="set-list-mid">是您找回登录密码的方式之一。建议您设置邮箱账号，更有效保障您的密码安全。</div>
    </Row>


    <Row class="safe-list">
      <div class="fl set-list-left">密保问题</div>
      <div v-if="userSafetyProblemFlag" class="fr set-list-right">
        <span class="text-success">
          <Icon type="checkmark-round"></Icon>
          <span class="ng-binding">已设置</span>
        </span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/problem'">修改</router-link></span>
      </div>
      <div class="fr set-list-right" v-else>
        <span class="text-warning">
          <Icon type="close-round"></Icon>
          <span class="ng-binding">未设置</span>
        </span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/problem'">设置</router-link></span>
      </div>
      <div class="set-list-mid">建议您设置三个容易记住，且最不容易被他人获取的问题及答案，更有效保障您的密码安全。</div>
    </Row>

    <Row v-if="userPayPwdFlag" class="safe-list">
      <div class="fl set-list-left">支付密码</div>
      <div class="fr set-list-right">
        <span class="text-success">
          <Icon type="checkmark-round"></Icon>
          <span class="ng-binding">已设置</span>
        </span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/pay/pwd'">修改</router-link></span>
      </div>
      <div class="set-list-mid">您已设置了支付密码 [用于支付验证]</div>
    </Row>
    <Row v-else class="safe-list">
      <div class="fl set-list-left">支付密码</div>
      <div class="fr set-list-right">
        <span class="text-warning">
          <Icon type="close-round"></Icon>
          <span class="ng-binding">未设置</span></span>
        <span class="text-explode ml10 mr10">|</span>
        <span class="link-operation"><router-link :to="'/user/safe/pay/pwd'">设置</router-link></span>
      </div>
      <div class="set-list-mid">是用于验证支付的方式之一。建议您设置支付密码。</div>
    </Row>


  </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
  export default {
    data() {
      return {
        userNickName: '',
        createTime: '',
        userPhone: '',
        userPhoneFlag: false,
        userMail: '',
        userMailFlag: false,
        userSafetyProblemFlag: false,
        userPayPwdFlag: false,
        percent: 20,
        safeLevelText: '低',
        safeLevelClass: 'text-danger',
        tipText: '继续努力',
        status: 'normal',
      }
    },
    created(){
      this.$emit('setNavInfo', '安全设置', 'userSafe', 'user');
      // this.getInfo();
    },
    methods: {
      getInfo() {
          let t = this;
        Api.getUserInfo().then(response => {
          if (response.code == 200) {
            let item = response.dataMap;

            t.userNickName = item.userNickName;
            t.userPhone = item.userPhone;
            t.userSafetyProblemFlag = item.safetyProblemFlag;
            if (item.userPhone == undefined || item.userPhone == null || item.userPhone == '') {
              t.userPhoneFlag = false;
            } else {
              t.userPhoneFlag = true;
              t.percent += 20;
            }
            t.userMail = item.userMail;
            if (item.userMail == undefined || item.userMail == null || item.userMail == '') {
              t.userMailFlag = false;
            } else {
              t.userMailFlag = true;
              t.percent += 20;
            }
            if (t.userSafetyProblemFlag) {
              t.percent += 20;
            }
            if (item.payPwd == undefined || item.payPwd == null || item.payPwd == '') {
              t.userPayPwdFlag = false;
            } else {
              t.userPayPwdFlag = true;
              t.percent += 20;
            }
            if (t.percent < 34) {
              t.safeLevelText = '低';
              t.safeLevelClass = 'text-danger';
              t.tipText = '继续努力';
              t.status = 'wrong';
            } else if (t.percent < 67) {
              t.safeLevelText = '中';
              t.safeLevelClass = 'text-warning';
              t.tipText = '继续努力';
              t.status = 'active';
            } else {
              t.safeLevelText = '高';
              t.safeLevelClass = 'text-success';
              t.tipText = '继续保持';
              t.status = 'success';
            }
            t.createTime = Util.transformTime(item.createTime);
          }
        });

      }
    }
  }
</script>
