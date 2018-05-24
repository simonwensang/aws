<style rel="stylesheet/scss" scoped>

</style>
<template>
  <div style="background: #fff;" class="pl20 pr20">
    <h4 class="mb20" style="padding-top: 50px;">我们不会泄漏您的手机信息</h4>
    <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;padding-bottom: 60px;">
      <FormItem label="当前登录密码：" prop="userPwd">
        <Input v-model="formData.userPwd" type="password" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem label="新的登录密码：" prop="newPwd">
        <Input v-model="formData.newPwd" type="password" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem label="确认新的登录密码：" prop="checkPwd">
        <Input v-model="formData.checkPwd" type="password" style="width:300px;" :maxlength="20"></Input>
      </FormItem>
      <FormItem class="pt10">
        <Button type="primary" @click="submitForm('validateForm')" style="width: 150px;height: 40px;" :loading="loading">确定</Button>
        <router-link :to="'/user/safe'" class="ml20">返回安全设置</router-link>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
  export default {
    data() {
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入当前登录密码！'));
        } else {
          callback();
        }
      };
      const validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新的登录密码！'));
        } else {
          callback();
        }
      };
      const validateCheckPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认新的登录密码'));
        } else {
          if (value != this.formData.newPwd) {
            callback(new Error('两次输入的密码不一致！'));
          }
          callback();
        }
      };
      return {
        loading: false,
        formData: {
          userPwd: '',
          newPwd: '',
          checkPwd: '',
        },
        ruleCustom: {
          userPwd: [
            { validator: validatePwd, trigger: 'blur' }
          ],
          newPwd: [
            { validator: validateNewPwd, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validateCheckPwd, trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.$emit('setNavInfo', '修改密码', 'userSafe', 'user');
    },
    methods: {
      submitForm(formName) {
        let t = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            t.loading = true;
              // 新增
              Api.userUpdatePwd(t.formData).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '设置成功!');
                  this.$router.push({name: 'userSafe'});
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
