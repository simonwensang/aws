<template>
    <div>
        <Button type="primary" @click="creatUser" style="margin-bottom:10px">新增商家</Button>
        <!-- <Button type="primary" @click="creatUser" style="margin-bottom:10px">新增产品</Button> -->
        <Modal v-model="modal1" :title="formTitle" @on-ok="ok('validateForm')" @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem :label="formUserName" prop="account">
                    <Input v-model="formData.account" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="手机号码：" prop="mobile">
                    <Input v-model="formData.mobile" style="width:300px;" :maxlength="11"></Input>
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
        <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
    </div>
</template>
<script>
import Api from "../../../store/Api";
import Store from "../../../store/index";
import Util from '../../../util/util';
export default {
    data() {
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
            brandList: [],
            factoryAccount: '',
            factoryCreateTime: '',
            hasFactory: false,
            factoryList: [],
            formData: {
                mobile: '',
                account: '',
                password: '',
                checkPwd: '',
            },
            ruleCustom: {
                mobile: [
                    { validator: validateMobile, trigger: 'blur' }
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
                    title: '商家名',
                    key: 'account',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.account)
                        ]);
                    }
                },
                {
                    title: '商家类型',
                    key: 'type'
                },
                {
                    title: '商家状态',
                    key: 'status'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 230,
                    align: 'center',
                    render: (h, params) => {
                        let renderList = [
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
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.shopDetail(params.index)
                                    }
                                }
                            }, '查看'),
                        ];
                        params.row.status == '启用' ? renderList.push(h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index, 2)
                                }
                            }
                        }, '禁用')) : renderList.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index, 1)
                                }
                            }
                        }, '启用'));
                        renderList.push(h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.delete(params.index)
                                }
                            }
                        }, '删除'));

                        return h('div', renderList);
                    }
                }
            ],
            data6: [],
            isCreat: false,
            isEdit: false,
            id: 0,
            totalRecords: 0,
            pageNo: 1,
            pageSize: 10,
            userType: 1,
            formTitle: '请填写商家信息',
            formUserName: '用户名'
        }
    },
    methods: {
        show(index) {
            console.log(index)
            this.modal1 = true;
            this.isEdit = true;
            this.id = this.data6[index].id;
            this.formData.mobile = this.data6[index].mobile;
            this.formData.account = this.data6[index].account;
            this.formData.password = this.data6[index].password;

        },
        shopDetail(index) {
            //到详情页
            let shopId = this.data6[index].id, brandId = this.data6[index].brandId;
            this.$router.push({ name: 'shop_detail', query: { shopId: shopId } });
        },
        remove(index, opt) {
            // 禁用启用
            let deleteUserServerData = { 'id': this.data6[index].id, 'opt': opt }
            Api.optUser(deleteUserServerData).then(response => {
                if (response.code == 200) {
                    Util.showNotificationBox('success', '操作成功!');
                    this.loading = false;
                    //查询用户列表
                    this.queryBrand();
                    // this.data6.splice(index, 1);
                }
            });
        },
        delete(index) {
            //删除
            let id = this.data6[index].id;
            Api.deleteUserServer(id).then(response => {
                if (response.code == 200) {
                    Util.showNotificationBox('success', '删除成功!');
                    this.loading = false;
                    //查询用户列表
                    this.queryBrand();
                    // this.data6.splice(index, 1);
                }
            });

        },
        ok(formName) {
            let t = this;
            console.log('formName==', formName)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    t.loading = true;
                    let userData = Object.assign({}, t.formData, { 'type': 2 });
                    if (t.isCreat) {
                        // 新增

                        Api.createUserServer(userData).then(response => {
                            if (response.code == 200) {
                                Util.showNotificationBox('success', '创建成功!');
                                t.loading = false;
                                //查询用户列表
                                t.queryBrand();

                            }
                        });
                    } else if (t.isEdit) {
                        // 编辑
                        Object.assign(userData, { 'id': t.id });
                        console.log('updateUserServer', userData)
                        Api.updateUserServer(userData).then(response => {
                            if (response.code == 200) {
                                Util.showNotificationBox('success', '编辑成功!');
                                t.loading = false;
                                //查询用户列表
                                t.queryBrand();

                            }
                        });
                    }
                    this.isEdit = false;
                    this.isCreat = false;

                } else {
                    Util.showNotificationBox('error', '表单验证失败!');
                    return false;
                }
            });
        },
        cancel() {
            this.isCreat = false;
            this.isEdit = false;
        },
        creatUser() {
            this.modal1 = true;
            this.isCreat = true;
        },
        queryBrand() {
            //查询用户列表
            let queryUserData = !!this.$route.query.factoryId ? {
                'pageNo': this.pageNo,
                'pageSize': this.pageSize,
                'factoryId': this.$route.query.factoryId
            } : {
                    'pageNo': this.pageNo,
                    'pageSize': this.pageSize,
                }
            Api.querySeller(queryUserData).then(response => {
                if (response.code == 200) {
                    this.loading = false;
                    if (!!response.dataMap.records && response.dataMap.records.length > 0) {
                        response.dataMap.records.forEach(function(element) {
                            if (element.type == 1) {
                                element.type = '管理员'
                            } else if (element.type == 2) {
                                element.type = '加盟商家'
                            } else if (element.type == 3) {
                                element.type = '供应商'
                            };
                            if (element.status == 0) {
                                element.status = '待审核'
                            } else if (element.status == 1) {
                                element.status = '启用'
                            } else if (element.status == 2) {
                                element.status = '禁止'
                            };
                            element.createTime = Util.transformTime(element.createTime);
                        }, this);
                    }
                    this.data6 = !!response.dataMap.records ? response.dataMap.records : [];
                    this.pageNo = !!response.dataMap.pageNo ? response.dataMap.pageNo : 1;
                    this.totalRecords = response.dataMap.totalRecords;
                }
            });
        },
        changePage(current) {
            console.log('changePage', current);
            this.pageNo = current;
            this.queryBrand()
        }
    },
    created() {
        let t = this;
        //查询用户列表
        this.queryBrand();
        //表头切换
        //    this.chengeType(this.$route.query.type);
        /* 
        //查询品牌列表
         let queryUserData = {
                'pageNo':1,
                'pageSize':1000
            }
        Api.querySeller(queryUserData).then((data) => {
                console.log('queryBrand',data);
                !!data.dataMap.records && data.dataMap.records.forEach(function(item){
                    t.brandList.push({value:item.id,label:item.brandName})
                })
        });
         //查询工厂列表
          let queryfactoryData = {
                'pageNo':1,
                'pageSize':10,
            }
            Api.querySeller(queryfactoryData).then((data) => {
                console.log('factoryList',data);
                !!data.dataMap.records && data.dataMap.records.forEach(function(item){
                    t.factoryList.push({value:item.id,label:item.account})
                })
        });
        */
        // let title = !!this.$route.query.factoryId ? '厂家详情页' : '产品管理列表'; 
        Store.commit('changeTitle', '商家列表');
        !!this.$route.query.factoryId ? Api.getUserServer(this.$route.query.factoryId).then((data) => {
            console.log('getProduct', data);
            this.factoryAccount = data.dataMap.account;
            this.factoryCreateTime = Util.transformTime(data.dataMap.createTime);
            this.hasFactory = true
        }) : '';
    }
}
</script>
