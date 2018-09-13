<template>
    <div>
        <!-- <Button type="primary" @click="creatUser" style="margin:10px 0">添加sku</Button> -->
        <Modal v-model="modal1" :title="formTitle" @on-ok="ok('validateForm')" @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem label="容器体积(毫升)：" prop="capacity">
                    <Input v-model="formData.capacity" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="实际灌装量(毫升)：" prop="volume">
                    <Input v-model="formData.volume" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="剩余量(毫升) ：" prop="remainder">
                    <Input v-model="formData.remainder" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="销售单价(毫升) ：" prop="salePrice">
                    <Input v-model="formData.salePrice" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="进价单价(毫升)  ：" prop="buyPrice">
                    <Input v-model="formData.buyPrice" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="进价总价  ：" prop="totalBuyPrice">
                    <Input v-model="formData.totalBuyPrice" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="销售单位(毫升)：" prop="saleUnit">
                    <Input v-model="formData.saleUnit" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="RFID码：" prop="rfid">
                    <Input v-model="formData.rfid" style="width:300px;" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input v-model="formData.password" style="width:300px;" :maxlength="11"></Input>
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
import Upload from '../../../components/common/upload.vue'
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
                salePrice: '',
                buyPrice: '',
                totalBuyPrice: '',
                saleUnit: '',
                rfid: '',
                password: '',
            },
            videoData: {},
            ruleCustom: {
                capacity: [
                    { trigger: 'blur' }
                ],
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                password: [
                    // { validator: validatePwd, trigger: 'blur' }
                ],
                checkPwd: [
                    { validator: validateCheckPwd, trigger: 'blur' }
                ]
            },
            modal1: false,
            columns7: [
                {
                    title: '产品名称',
                    key: 'productName'
                },
                {
                    title: '品牌名称',
                    key: 'brandName'
                },
                {
                    title: ' 容器体积(毫升)',
                    key: 'capacity'
                },
                {
                    title: ' 实际灌装量(毫升) ',
                    key: 'volume'
                },
                {
                    title: ' 剩余量(毫升) ',
                    key: 'remainder'
                },
                {
                    title: ' 销售单价(毫升) ',
                    key: 'salePrice'
                },
                {
                    title: ' 进价单价(毫升) ',
                    key: 'buyPrice'
                },
                {
                    title: '进价总价',
                    key: 'totalBuyPrice'
                },
                {
                    title: '状态',
                    key: 'status'
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     width: 200,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h('div', [
                //             h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'small'
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.show(params.index)
                //                     }
                //                 }
                //             }, '编辑'),
                //             h('Button', {
                //                 props: {
                //                     type: 'error',
                //                     size: 'small'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         this.remove(params.index)
                //                     }
                //                 }
                //             }, '删除')
                //         ]);
                //     }
                // }
            ],
            data6: [],
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
            salePrice: 0,
            brandId: '',
            productId: '',
            imageUrl: '',
            defaultUrl: ''
        }
    },
    methods: {
        show(index) {
            console.log(index)
            this.modal1 = true;
            this.isEdit = true;
            this.id = this.data6[index].id;
            let initFormData = this.data6[index];
            //编辑的时候显示默认值
            // let initFormData = {
            //     capacity:this.data6[index].capacity ? this.data6[index].capacity : '',
            // }
            for (var key in initFormData) {
                if (this.formData.hasOwnProperty(key)) {
                    this.formData[key] = initFormData[key] ? initFormData[key] : ''
                }
            }
            console.log('this.formData', this.formData)

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
                    let userData = Object.assign({}, t.formData);
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
                // 'productId':this.productId
            }
            Api.querySku(queryUserData).then(response => {
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
                                element.status = '空瓶'
                            } else if (element.status == 1) {
                                element.status = '罐装完成'
                            } else if (element.status == 2) {
                                element.status = '采购下单'
                            } else if (element.status == 3) {
                                element.status = '运输'
                            } else if (element.status == 4) {
                                element.status = '收货'
                            } else if (element.status == 5) {
                                element.status = '上架'
                            } else if (element.status == 6) {
                                element.status = '下架'
                            };
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
    components: {
        "UploadAssembly": Upload
    },
    created() {
        Store.commit('changeTitle', 'sku列表页')
        //查询用户列表
        //    this.productId = this.$route.query.productId;
        //    this.brandId = this.$route.query.brandId; 
        //    this.videoData = {productId:this.$route.query.productId}
        //查询宣传片
        //    !!this.$store.state.videoId && Api.getProductMedia(this.$store.state.videoId).then((data) => {
        //         this.defaultUrl = data.dataMap
        //    })
        //表头切换
        //    this.chengeType(this.$route.query.type);
        this.queryBrand();
        // Api.getProduct(this.productId).then((data) => {
        //     console.log('getProduct',data);
        //     this.productName = data.dataMap.productName;
        //     this.salePrice = data.dataMap.salePrice;
        //     this.imageUrl = 'http://allbuywine.oss-cn-hangzhou.aliyuncs.com/'+data.dataMap.image
        // })
    }
}
</script>
