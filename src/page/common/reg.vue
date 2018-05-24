<template>
  <div>
    <div v-title>注册</div>
    <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
      <FormItem label="昵称：" prop="userNickName">
        <Input v-model="formData.userNickName" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem label="用户名：" prop="userName">
        <Input v-model="formData.userName" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem label="密码：" prop="userPwd">
        <Input v-model="formData.userPwd" type="password" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem label="确认密码：" prop="checkPwd">
        <Input v-model="formData.checkPwd" type="password" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem class="pt10">
        <Button type="primary" @click="submitForm('validateForm')" :loading="loading" style="width: 150px;height: 40px;">确定</Button>
        <router-link :to="'/login'" class="ml20">返回登录</router-link>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from '../../util/util';
  export default {
    data() {
      const validateUserNickName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称！'));
        } else {
          if (value.length > 16) {
            callback(new Error('昵称不能大于16个字符！'));
          }
          callback();
        }
      };
      const validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名！'));
        } else {
          if (value.length < 6) {
            callback(new Error('用户名不能少于6位！'));
          }
          if (value.length > 16) {
            callback(new Error('用户名不能大于16位！'));
          }
          callback();
        }
      };
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'));
        } else {
          if (value.length < 6) {
            callback(new Error('密码不能少于6位！'));
          }
          if (value.length > 16) {
            callback(new Error('密码不能大于6位！'));
          }
          callback();
        }
      };
      const validateCheckPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'));
        } else {
          if (value != this.formData.userPwd) {
            callback(new Error('两次输入的密码不一致！'));
          }
          callback();
        }
      };
      return {
        loading: false,
        formData: {
          userNickName: '',
          userName: '',
          userPwd: '',
          checkPwd: '',
        },
        ruleCustom: {
          userNickPwd: [
            { validator: validateUserNickName, trigger: 'blur' }
          ],
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          userPwd: [
            { validator: validatePwd, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validateCheckPwd, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let t = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            t.loading = true;
            // 新增
            Api.reg(t.formData).then(response => {
              if (response.code == 200) {
                Util.showNotificationBox('success', '注册成功!');
                this.$router.push({name: 'login'});
                t.loading = false;
              }
            });
          } else {
            Util.showNotificationBox('error', '表单验证失败!');
          }
        });
      }
    }
  }
</script>
