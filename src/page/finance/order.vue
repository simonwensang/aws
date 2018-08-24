<style rel="stylesheet/scss" scoped>
</style>
<template>
<div>
<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
    <Row>
        <Col span="11">
        <FormItem prop="sellerNameLike " label="商家名称">
            <Input type="text" v-model="formInline.sellerNameLike " placeholder="请输入商家名称">
            </Input>
        </FormItem>
        </Col>
        <Col span="11">
         <FormItem prop="orderTime" label="订单时间">
                <DatePicker type="daterange" v-model="formInline.orderTime" placement="bottom-end" placeholder="请选择订单日期范围" style="width: 200px"></DatePicker>
        </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span="11">
         <FormItem prop="status" label="订单状态">
             <Select v-model="formInline.status" placeholder="请选择订单状态">
                <Option value="1">待付款</Option>
                <Option value="2">付款成功</Option>
                <Option value="3">付款失败</Option>
                <Option value="4">退款</Option>
                <Option value="5">出酒成功</Option>
                <Option value="6">交易取消</Option>
            </Select>
        </FormItem>
        </Col>
    <Col span="11">
        <FormItem prop="machineCode" label="机器码">
            <Input type="text" v-model="formInline.machineCode" placeholder="请输入机器码">
            </Input>
        </FormItem>
        </Col>
        </Row>
        <Row>
           <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
        </FormItem>
        </Row>
    </Form>
  <i-table :columns="columns1" :data="data1"></i-table>
  <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from '../../util/util';

   export default {
        data () {
            return {
                  formInline: {
                    sellerNameLike : '',
                    machineCode: '',
                    orderTime:'',
                    status:''
                },
                ruleInline: {
                    // sellerNameLike : [
                    //     { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    // ],
                    // password: [
                    //     { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    //     { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    // ]
                },
                self: this,
                data1:[],
                columns1: [
                    {
                        title: '订单id',
                        key: 'id',
                        width: 160,
                    },
                    {
                        title: '商品id',
                        key: 'productId'
                    },
                    {
                        title: '商家名称',
                        key: 'sellerName'
                    },
                    {
                        title: '机器码',
                        key: 'machineCode',
                        width: 245,
                    },
                    {
                        title: '购买量',
                        key: 'sellerAmount'
                    },
                    {
                        title: '实际售出量',
                        key: 'dropAmount'
                    },
                    {
                        title: '金额',
                        key: 'payment'
                    },
                    {
                        title: '购买时间',
                        key: 'createTime'
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    }
                ],
                pageNo:1,
                pageSize:10,
                totalRecords:0,
                convertFromData:{}
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
              handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log('this',this.formInline);
                        this.formInline.createTimeFrom = this.formInline.orderTime[0];
                        this.formInline.createTimeTo = this.formInline.orderTime[1];
                        for(let key in this.formInline){
                            // console.log('this.formInline.'+key,this.formInline[key]);
                            // console.log('this.formInline.sellerNameLike ',this.formInline.sellerNameLike )
                            if( key != 'orderTime'){
                               Object.assign(this.convertFromData,{[key]:this.formInline[key]});
                            }
                        }
                        
                        console.log('convertFromData',this.convertFromData);
                        this.queryOrder();
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            changePage(current){
                console.log('changePage',current);
                this.pageNo = current;
                this.queryOrder()
            },
            queryOrder(){
                let queryOrderData = Object.assign({}, {
                'pageNo':this.pageNo,
                'pageSize':this.pageSize
            },this.convertFromData);

            Api.queryOrder(queryOrderData).then((data) => {
                !!data.dataMap.records && data.dataMap.records.forEach(function(element) {
                                if(element.status == 0){
                                    element.status = '初始'
                                }else if(element.status == 1){
                                    element.status = '待付款'
                                }else if(element.status == 2){
                                   element.status = '付款成功'
                                }else if(element.status == 3){
                                   element.status = '付款失败'
                                }else if(element.status == 4){
                                   element.status = '退款'
                                }else if(element.status == 5){
                                   element.status = '出酒成功'
                                }else if(element.status == 6){
                                   element.status = '交易取消'
                                };
                                element.createTime = Util.transformTime(element.createTime);
                                element.updateTime = Util.transformTime(element.updateTime);
                            }, this);
                         this.data1 = data.dataMap.records;
                         this.pageNo = data.dataMap.pageNo;
                         this.totalRecords = data.dataMap.totalRecords;
            })
            }
        },
        created(){
             //查询用户列表
            this.queryOrder()
        }
    }
</script>