<template>
    <div>
        <Button type="primary" @click="modal1 = true">新增用户</Button>
        <Modal
            v-model="modal1"
            title="请填写用户信息"
            @on-ok="ok('validateForm')"
            @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem label="昵称：" prop="name">
                    <Input v-model="formData.name" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="用户名：" prop="account">
                    <Input v-model="formData.account" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input v-model="formData.password" type="password" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="确认密码：" prop="checkPwd">
                    <Input v-model="formData.checkPwd" type="password" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Table border :columns="columns7" :data="data6"></Table>
    </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
    export default {
        data () {
            const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称！'));
        } else {
          if (value.length > 16) {
            callback(new Error('昵称不能大于16个字符！'));
          }
          callback();
        }
      };
      const validateAccount = (rule, value, callback) => {
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
          if (value != this.formData.password) {
              console.log(this.formData.password)
            callback(new Error('两次输入的密码不一致！'));
          }
          callback();
        }
      };
            return {
                 formData: {
                    name: '',
                    account: '',
                    password: '',
                    checkPwd: '',
                },
                ruleCustom: {
                userNickPwd: [
                    { validator: validateName, trigger: 'blur' }
                ],
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePwd, trigger: 'blur' }
                ],
                checkPwd: [
                    { validator: validateCheckPwd, trigger: 'blur' }
                ]
                },
                modal1: false,
                columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            ok (formName) {
                let t = this;
                console.log('formName==',formName)
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    t.loading = true;
                    // 新增
                    Api.createUserServer(t.formData).then(response => {
                    if (response.code == 200) {
                        Util.showNotificationBox('success', '创建成功!');
                        // this.$router.push({name: 'login'});
                        t.loading = false;
                    }
                    });
                } else {
                    Util.showNotificationBox('error', '表单验证失败!');
                    return false;
                }
                });
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>
