<template>
    <div>
        <i-button type="ghost" style="margin-bottom:10px">
            <router-link to="/shop/shop_management">返回</router-link>
        </i-button>
        <Card>
            <p slot="title">商家详情</p>
            <p>商家名称: {{account}}</p>
            <p>手机号: {{mobile}}</p>
            <p>创建时间: {{createTime}}</p>
        </Card>
        <Card style="marginTop:10px">
            <p slot="title">商家账户资金</p>
            <p>真实姓名: {{realName}}</p>
            <p>身份证号: {{idNumber}}</p>
            <p>状态: {{status}}</p>
            <Button type="primary" size="small" @click='modal1 = true'>查看资金明细</Button>
        </Card>
        <Modal v-model="modal1" title="资金明细列表" @on-ok="ok" width="800px" cancel-text="" @on-cancel="cancel">
            <Table border :columns="columns66" :data="data66"></Table>
            <Page :total="totalRecords66" show-total :current="pageNo6" @on-change='changePage6'></Page>
        </Modal>
        <p style="marginTop:15px">酒机列表</p>
        <Table style="marginTop:10px" border :columns="columns7" :data="data6"></Table>
        <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
    </div>
</template>
<script>
import Api from "../../../store/Api";
import Util from '../../../util/util';
import Store from "../../../store/index";
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
            formData: {
                capacity: '',
                volume: '',
                remainder: '',
                mobile: '',
                totalBuyPrice: '',
                saleUnit: '',
                rfid: ''
            },
            ruleCustom: {
                capacity: [
                    { trigger: 'blur' }
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
                    title: '酒机名称',
                    key: 'machineName'
                },
                {
                    title: '酒机码',
                    key: 'machineCode'
                },
                {
                    title: '创建时间',
                    key: 'createTime'
                }
            ],
            columns66: [
                {
                    title: '商家名称',
                    key: 'sellerName'
                },
                {
                    title: '原账户金额',
                    key: 'accountOld',
                },
                {
                    title: '账户新增额(负数代表减) ',
                    key: 'accountAdd',
                    width: 180
                },
                {
                    title: '更新后金额',
                    key: 'accountNew'
                },
                {
                    title: '类型',
                    key: 'type'
                }
            ],
            data6: [],
            realName: '',
            idNumber: '',
            status: '',
            isCreat: false,
            isEdit: false,
            id: 0,
            totalRecords: 0,
            pageNo: 1,
            pageSize: 10,
            userType: 1,
            formTitle: '请填写sku信息',
            formUserName: '用户名',
            productName: '',
            mobile: 0,
            brandId: '',
            productId: '',
            shopId: ''
        }
    },
    methods: {
        show(index) {
            console.log(index)
            this.modal1 = true;
            this.isEdit = true;
            this.id = this.data6[index].id
        },
        toSku(index) {
            //到详情页
            let productId = this.data6[index].id;
            this.$router.push({ name: 'sku_management', query: { id: productId } });
        },
        remove(index) {
            // 删除
            let deleteUserServerData = { 'id': this.data6[index].id }
            Api.deleteSku(deleteUserServerData).then(response => {
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
                    let userData = Object.assign({}, t.formData, { 'productId': this.productId, 'brandId': this.brandId });
                    if (t.isCreat) {
                        // 新增
                        Api.createSku(userData).then(response => {
                            if (response.code == 200) {
                                Util.showNotificationBox('success', '创建成功!');
                                t.loading = false;
                                //查询用户列表
                                t.queryBrand();
                                this.isCreat = false;
                            }
                        });
                    } else if (t.isEdit) {
                        // 编辑
                        Object.assign(userData, { 'id': t.id });
                        console.log('updateUserServer', userData)
                        Api.updateSku(userData).then(response => {
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
        cancel() {
            this.isCreat = false;
            this.isCreat = false;
        },
        creatUser() {
            this.modal1 = true;
            this.isCreat = true;
        },
        queryBrand() {
            //查询用户列表
            let queryUserData = {
                'pageNo': this.pageNo,
                'pageSize': this.pageSize,
                'sellerId': this.shopId
            }
            Api.queryMachine(queryUserData).then(response => {
                if (response.code == 200) {
                    this.loading = false;
                    // if(!!response.dataMap.records && response.dataMap.records.length > 0){
                    //     response.dataMap.records.forEach(function(element) {
                    //         if(element.type == 1){
                    //             element.type = '管理员'
                    //         }else if(element.type == 2){
                    //             element.type = '加盟商家'
                    //         }else if(element.type == 3){
                    //            element.type = '供应商'
                    //         };
                    //         if(element.status == 0){
                    //             element.status = '空瓶'
                    //         }else if(element.status == 1){
                    //             element.status = '罐装完成'
                    //         }else if(element.status == 2){
                    //            element.status = '采购下单'
                    //         }else if(element.status == 3){
                    //            element.status = '运输'
                    //         }else if(element.status == 4){
                    //            element.status = '收货'
                    //         }else if(element.status == 5){
                    //            element.status = '上架'
                    //         }else if(element.status == 6){
                    //            element.status = '下架'
                    //         };
                    //     }, this);
                    // }
                    this.data6 = !!response.dataMap.records ? response.dataMap.records : [];
                    this.pageNo = !!response.dataMap.pageNo ? response.dataMap.pageNo : 1;
                    this.totalRecords = response.dataMap.totalRecords;
                }
            });
        },
        querySellerAccountLog() {
            let querySellerAccountLogData = {
                'pageNo': this.pageNo,
                'pageSize': this.pageSize,
                'sellerId': this.shopId
            }
            Api.querySellerAccountLog(querySellerAccountLogData).then(response => {
                if (response.code == 200) {
                    this.loading = false;
                    if (!!response.dataMap.records && response.dataMap.records.length > 0) {
                        response.dataMap.records.forEach(function(element) {
                            if (element.type == 1) {
                                element.type = '订单'
                            } else if (element.type == 2) {
                                element.type = '采购'
                            } else if (element.type == 3) {
                                element.type = '充值'
                            } else if (element.type == 4) {
                                element.type = '提现'
                            };
                            // if(element.status == 0){
                            //     element.status = '空瓶'
                            // }else if(element.status == 1){
                            //     element.status = '罐装完成'
                            // }else if(element.status == 2){
                            //    element.status = '采购下单'
                            // }else if(element.status == 3){
                            //    element.status = '运输'
                            // }else if(element.status == 4){
                            //    element.status = '收货'
                            // }else if(element.status == 5){
                            //    element.status = '上架'
                            // }else if(element.status == 6){
                            //    element.status = '下架'
                            // };
                        }, this);
                    }
                    this.data66 = !!response.dataMap.records ? response.dataMap.records : [];
                    this.pageNo66 = !!response.dataMap.pageNo ? response.dataMap.pageNo : 1;
                    this.totalRecords66 = response.dataMap.totalRecords;
                }
            });
        },
        changePage(current) {
            console.log('changePage', current);
            this.pageNo = current;
            this.queryBrand()
        },
        changePage6(current) {
            console.log('changePage', current);
            this.pageNo = current;
            this.querySellerAccountLog()
        }
    },
    created() {
        Store.commit('changeTitle', '商家详情页')
        //查询用户列表
        this.shopId = this.$route.query.shopId;
        this.brandId = this.$route.query.brandId;
        this.queryBrand();
        //表头切换
        //    this.chengeType(this.$route.query.type);
        Api.getSellerDetail(this.shopId).then((data) => {
            console.log('getProduct', data);
            this.account = data.dataMap.account;
            this.mobile = data.dataMap.mobile;
            this.createTime = Util.transformTime(data.dataMap.createTime);
            this.realName = data.dataMap.sellerAccount.realName;
            this.idNumber = data.dataMap.sellerAccount.idNumber;
            if (data.dataMap.sellerAccount.status == 0) {
                this.status = '身份待认证'
            } else if (data.dataMap.sellerAccount.status == 1) {
                this.status = '认证通过'
            } else {
                this.status = '冻结账户'
            }
        });
        let querySellerAccountLogData = {
            'pageNo': this.pageNo,
            'pageSize': this.pageSize,
            'sellerId': this.shopId
        }
        this.querySellerAccountLog()
    }
}
</script>
