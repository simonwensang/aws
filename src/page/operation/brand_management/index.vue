<template>
    <div>
        <Button type="primary" @click="creatUser" style="margin-bottom:10px">新增品牌</Button>
        <Modal
            v-model="modal1"
            :title="formTitle"
            @on-ok="ok('validateForm')"
            @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem label="品牌名：" prop="brandName">
                    <Input v-model="formData.brandName" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
    </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
  import Store from "../../../store/index";
    export default {
        data () {
            const validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码！'));
        } else {
          if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确格式的手机号码！'));
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
                    brandName: ''
                },
                ruleCustom: {
                brandName: [
                    {  trigger: 'blur' }
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
                        title:'品牌名称',
                        key: 'brandName'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
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
                                }, '编辑'),
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
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [],
                isCreat:false,
                isEdit:false,
                id:0,
                totalRecords:0,
                pageNo:1,
                pageSize:10,
                userType:1,
                formTitle:'请填写用户信息',
                formUserName:'用户名'
            }
        },
        methods: {
            show (index) {
                console.log(index)
                this.modal1 = true;
                this.isEdit = true;
                this.id = this.data6[index].id
            },
            remove (index) {
                // 删除
                let deleteBrandData = {'id':this.data6[index].id}
                 Api.deleteBrand(deleteBrandData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '删除成功!');
                            this.loading = false;
                            //查询用户列表
                            this.queryBrand();
                            // this.data6.splice(index, 1);
                        }
                        });
            },
            ok (formName) {
                let t = this;
                console.log('formName==',formName)
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    t.loading = true;
                    let userData = Object.assign({},t.formData);
                    if(t.isCreat){
                        // 新增
                        Api.createBrand(userData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '创建成功!');
                            t.loading = false;
                            //查询用户列表
                            t.queryBrand();
                            this.isCreat = false;
                        }
                        });
                    }else if (t.isEdit){
                        // 编辑
                         Object.assign(userData,{'id':t.id});
                         console.log('updateBrand',userData)
                        Api.updateBrand(userData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '编辑成功!');
                            t.loading = false;
                            //查询用户列表
                            t.queryBrand();
                            this.isEdit = false;
                        }
                        });
                    }
                    
                } else {
                    Util.showNotificationBox('error', '表单验证失败!');
                    return false;
                }
                });
            },
            cancel () {
                this.isCreat = false;
                this.isCreat = false;
            },
            creatUser(){
                this.modal1 = true;
                this.isCreat = true;
            },
            queryBrand(){
                //查询用户列表
            let queryUserData = {
                'pageNo':this.pageNo,
                'pageSize':this.pageSize
            }
            Api.queryBrand(queryUserData).then(response => {
               if (response.code == 200) {
                        this.loading = false;
                        if(!!response.dataMap.records && response.dataMap.records.length > 0){
                            response.dataMap.records.forEach(function(element) {
                                if(element.type == 1){
                                    element.type = '管理员'
                                }else if(element.type == 2){
                                    element.type = '加盟商家'
                                }else if(element.type == 3){
                                   element.type = '供应商'
                                };
                                if(element.status == 0){
                                    element.status = '待审核'
                                }else if(element.status == 1){
                                    element.status = '启用'
                                }else if(element.status == 2){
                                   element.status = '禁止'
                                };
                            }, this);
                        }
                        this.data6 = !!response.dataMap.records ? response.dataMap.records : [];
                         this.pageNo = !!response.dataMap.pageNo ? response.dataMap.pageNo : 1;
                         this.totalRecords = response.dataMap.totalRecords;
                    }
                });
            },
            changePage(current){
                console.log('changePage',current);
                this.pageNo = current;
                this.queryBrand()
            }
        },
        created(){
            //查询用户列表
           this.queryBrand();
           //表头切换
        //    this.chengeType(this.$route.query.type);
        Store.commit('changeTitle','品牌管理列表')
        }
    }
</script>
