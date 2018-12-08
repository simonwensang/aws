<template>
    <div>
        <i-button type="ghost" style="margin-bottom:10px">
            <router-link :to="backUrl">返回</router-link>
        </i-button>
        <Card>
            <p slot="title">酒机详情</p>
            <p>酒机名称: {{machineName}}</p>
            <p>推送别名: {{pushAlias}}</p>
            <p>所属商家名称: {{sellerName}}</p>
            <p>酒机管路数: {{pipeCount}}</p>
            <p>出酒上限: {{pourLimit}}</p>
            <p>缺酒下限: {{lackLowerLimit}}</p>
            <p>小程序二维码 : {{miniappCode}}</p>
            <p>创建时间: {{createTime}}</p>
            <Button type="primary" size="small" @click='modal1 = true'>编辑酒机</Button>
        </Card>
        <!-- <Card style="marginTop:10px">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p slot="title">商家账户资金</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p>真实姓名: {{realName}}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p>身份证号: {{idNumber}}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p>状态: {{status}}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <Button type="primary"  size="small" @click='modal1 = true'>查看资金明细</Button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </Card> -->
        <Modal v-model="modal1" title="编辑酒机" @on-ok="ok('validateForm')" @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem label="酒机名称：" prop="machineName">
                    <Input v-model="formData.machineName" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="出酒上限：" prop="pourLimit">
                    <Input v-model="formData.pourLimit" style="width:300px;"></Input>
                </FormItem>
                <FormItem label="缺酒下限：" prop="lackLowerLimit">
                    <Input v-model="formData.lackLowerLimit" style="width:300px;"></Input>
                </FormItem>
                <FormItem label="酒机管路数:" prop="pipeCount">
                    <Input v-model="formData.pipeCount" style="width:300px;"></Input>
                </FormItem>
                <FormItem label="密钥：" prop="password">
                    <Input v-model="formData.password" type="password" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="小程序二维码：" prop="miniappCode">
                    <Input v-model="formData.miniappCode" style="width:300px;"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal2" title="请输入酒机器管路信息" @on-ok="createDrop('dropForm')" @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="dropForm" :model="dropForm" :label-width="150" style="padding-top: 30px;">
                <!-- <FormItem label="酒品skuid:" prop="skuId">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <Input v-model="dropForm.skuId" style="width:300px;" :maxlength="20"></Input>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </FormItem>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             <FormItem label="酒品id" prop="productId">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <Input v-model="dropForm.productId" style="width:300px;" ></Input>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </FormItem>  -->
                <!-- <FormItem label="酒机码" prop="machineCode">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <Input v-model="dropForm.machineCode" style="width:300px;" ></Input>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </FormItem> -->
                <FormItem label="酒机管路数:" prop="dropCode">
                    <!-- <Input v-model="dropForm.dropCode" style="width:300px;" ></Input> -->
                    <Select v-model="dropForm.dropCode" style="width:300px">
                        <Option value="1" :key="1">1</Option>
                        <Option value="2" :key="2">2</Option>
                        <Option value="3" :key="3">3</Option>
                        <Option value="4" :key="4">4</Option>
                        <Option value="5" :key="5">5</Option>
                        <Option value="6" :key="6">6</Option>
                    </Select>
                </FormItem>
                <FormItem label="免费品尝量" prop="freeTastedAmount">
                    <Input v-model="dropForm.freeTastedAmount" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="管路偏差" prop="dropErrorAmount">
                    <Input v-model="dropForm.dropErrorAmount" style="width:300px;"></Input>
                </FormItem>
                <FormItem label="管路补偿量 " prop="dropCompensateAmount">
                    <Input v-model="dropForm.dropCompensateAmount" style="width:300px;"></Input>
                </FormItem>
                <FormItem label="是否免费" prop="isFreeTasted">
                    <RadioGroup v-model="dropForm.isFreeTasted">
                        <Radio label="免费"></Radio>
                        <Radio label="付费"></Radio>
                    </RadioGroup>
                    <!-- <Input v-model="dropForm.isFreeTasted" style="width:300px;" ></Input> -->
                </FormItem>
                <!-- <FormItem label="是否在售" prop="isLockedSale">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <RadioGroup v-model="dropForm.isLockedSale">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <Radio label="销售"></Radio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <Radio label="停售"></Radio>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </RadioGroup> -->
                <!-- <Input v-model="dropForm.isFreeTasted" style="width:300px;" ></Input> -->
                <!-- </FormItem> -->
            </Form>
        </Modal>
        <span style="margin: 25px 20px 0px 0px;display: inline-block;font-weight: 600;font-size: 14px;">酒机管路列表</span>
        <Button type="primary" size="small" @click='modal2 = true'>增加酒机管路</Button>
        <Table style="marginTop:10px" border :columns="columns7" :data="data6"></Table>
        <!-- <div v-if="this.longitude && this.longitude != '0.000000'"> -->
        <p v-if="this.longitude && this.longitude != '0.000000'" style="margin: 20px">酒机位置</p>
        <div id="allmap" style="height:300px"></div>
        <!-- </div> -->

        <!-- <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page> -->
    </div>
</template>
<script>
import Api from "../../../store/Api";
import Util from '../../../util/util';
import Store from "../../../store/index";
import BMap from 'BMap'
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
            dropForm: {
                skuId: '',
                productId: '',
                machineCode: '',
                dropCode: '',
                freeTastedAmount: '',
                dropErrorAmount: '',
                dropCompensateAmount: '',
                isFreeTasted: ''
            },
            machineName: '',
            machineCode: '',
            pipeCount: '',
            pourLimit: '',
            createTime: '',
            formData: {
                machineName: '',
                pourLimit: '',
                lackLowerLimit: '',
                miniappCode: '',
                password: '',
                pipeCount: ''
            },
            lackLowerLimit: '',
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
            backUrl: '/wine/wine_management_audit',
            modal2: false,
            columns7: [
                {
                    title: '酒品skuid ',
                    key: 'skuId'
                },
                {
                    title: '酒品id',
                    key: 'productId'
                },
                {
                    title: '酒机码',
                    key: 'machineCode'
                },
                {
                    title: '管路数 ',
                    key: 'dropCode'
                },
                {
                    title: '免费品尝量  ',
                    key: 'freeTastedAmount'
                },
                {
                    title: '管路偏差  ',
                    key: 'dropErrorAmount'
                },
                {
                    title: '管路补偿量 ',
                    key: 'dropCompensateAmount'
                },
                {
                    title: '是否免费 ',
                    key: 'isFreeTasted'
                },
                {
                    title: '销售状态 ',
                    key: 'isLockedSale'
                },
                {
                    title: '商品状态 ',
                    key: 'isPullOff'
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
            pushAlias: 0,
            brandId: '',
            productId: '',
            shopId: '',
            machineId: '',
            sellerName: '',
            miniappCode: '',
            longitude: '',
            latitude: ''

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
                    // this.queryDrop();
                    // this.data6.splice(index, 1);
                }
            });
        },
        createDrop(formName) {
            let t = this;
            console.log('createDrop', t.dropForm);
            t.dropForm.isFreeTasted = !!t.dropForm.isFreeTasted && t.dropForm.isFreeTasted == "付费" ? 0 : 1;
            t.dropForm.isLockedSale = !!t.dropForm.isLockedSale && t.dropForm.isLockedSale == "销售" ? 0 : 1;
            t.dropForm.machineCode = this.machineCode;
            let dropData = Object.assign({}, t.dropForm);
            // 创建九路
            console.log('createDrop', dropData)
            Api.createDrop(dropData).then(response => {
                if (response.code == 200) {
                    Util.showNotificationBox('success', '创建成功!');
                    t.loading = false;
                    //查询用户列表
                    // t.queryBrand();
                    t.queryWineDetail()
                }
            });
        },
        ok(formName) {
            let t = this;
            console.log('formName==', formName)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    t.loading = true;
                    let userData = Object.assign({}, t.formData, { 'id': this.machineId });
                    // 编辑
                    console.log('updateMachine', userData)
                    Api.updateMachine(userData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '编辑成功!');
                            t.loading = false;
                            //查询用户列表
                            // t.queryBrand();
                            t.queryWineDetail()
                        }
                    });


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
        queryDrop() {
            //查询用户列表
            let queryUserData = {
                'pageNo': this.pageNo,
                'pageSize': this.pageSize
            }
            Api.queryDrop(queryUserData).then(response => {
                if (response.code == 200) {
                    this.loading = false;
                    if (!!response.dataMap.records && response.dataMap.records.length > 0) {
                        response.dataMap.records.forEach(function(element) {
                            if (element.isFreeTasted == 0) {
                                element.isFreeTasted = '收费'
                            } else if (element.isFreeTasted == 2) {
                                element.isFreeTasted = '免费'
                            };
                            if (element.isLockedSale == 0) {
                                element.isLockedSale = '销售'
                            } else if (element.isLockedSale == 1) {
                                element.isLockedSale = '停止'
                            };
                            if (element.isPullOff == 0) {
                                element.isPullOff = '上架'
                            } else if (element.isPullOff == 1) {
                                element.isPullOff = '下架'
                            };
                        }, this);
                    }
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
            // this.queryDrop()
        },
        changePage6(current) {
            console.log('changePage', current);
            this.pageNo = current;
            this.querySellerAccountLog()
        },
        queryWineDetail() {
            //获取酒机详情
            this.machineId && Api.getMachineDetail(this.machineId).then((data) => {
                console.log('queryWineDetail', data)
                if (data.code == 200) {
                    this.machineName = !!data.dataMap.machineName ? data.dataMap.machineName : '-';
                    this.machineCode = data.dataMap.machineCode;
                    this.pushAlias = !!data.dataMap.pushAlias ? data.dataMap.pushAlias : '-';
                    this.sellerName = !!data.dataMap.sellerName ? data.dataMap.sellerName : '-';
                    this.pipeCount = !!data.dataMap.pipeCount ? data.dataMap.pipeCount : 0;
                    this.pourLimit = !!data.dataMap.pourLimit ? data.dataMap.pourLimit : 0;
                    this.lackLowerLimit = !!data.dataMap.lackLowerLimit ? data.dataMap.lackLowerLimit : 0;
                    this.miniappCode = !!data.dataMap.miniappCode ? data.dataMap.miniappCode : '';
                    this.createTime = Util.transformTime(data.dataMap.createTime);
                    this.data6 = data.dataMap.dropODTOList;
                    this.longitude = data.dataMap.longitude;
                    this.latitude = data.dataMap.latitude;
                    this.renderMap()



                }
            })
        },
        renderMap() {
            if (this.longitude && this.longitude != '0.000000') {
                console.log(this.longitude)
                // 百度地图API功能
                var map = new BMap.Map("allmap");    // 创建Map实例
                // `longitude` 121.352873 ； `latitude` 31.411629
                map.centerAndZoom(new BMap.Point(121.352873, 31.411629), 11);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes: [
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]
                }));
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
                console.log(this.longitude, this.longitude)

                let new_point = new BMap.Point(this.longitude, this.longitude);

                var mk = new BMap.Marker(new_point);
                map.addOverlay(mk);
                map.panTo(mk);
                // console.log('map----', )

            }

        }
    },
    mounted() {
        console.log(111)


    },
    created() {
        Store.commit('changeTitle', '酒机详情页')
        //查询用户列表
        this.shopId = this.$route.query.shopId;
        this.brandId = this.$route.query.brandId;
        this.machineId = this.$route.query.machineId;
        this.backUrl = this.$route.query.opt == 2 ? 'wine_management_audit' : '/wine/wine_management'
        //查询酒路
        //    this.queryDrop();
        this.queryWineDetail();
        //表头切换
        //    this.chengeType(this.$route.query.type);
        // Api.getSellerDetail(this.shopId).then((data) => {
        //     console.log('getProduct',data);
        //     this.account = data.dataMap.account;
        //     this.mobile = data.dataMap.mobile;
        //     this.createTime = Util.transformTime(data.dataMap.createTime);
        //     this.realName = data.dataMap.sellerAccount.realName;
        //     this.idNumber = data.dataMap.sellerAccount.idNumber;
        //     if(data.dataMap.sellerAccount.status == 0){
        //         this.status = '身份待认证'
        //     }else if(data.dataMap.sellerAccount.status == 1){
        //         this.status = '认证通过'
        //     }else{
        //         this.status = '冻结账户'
        //     }
        // });
        let querySellerAccountLogData = {
            'pageNo': this.pageNo,
            'pageSize': this.pageSize,
            'sellerId': this.shopId
        }
        this.querySellerAccountLog();
    }
}
</script>
