<style rel="stylesheet/scss" scoped>
</style>
<template>
  <div style="background: #fff;" class="p20">
    <Form ref="domainInfoAddFormItem" :rules="ruleValidate" :model="domainInfoAddFormItem" inline>
      <FormItem label="所有者类型：" :label-width="120">
        <RadioGroup v-model="domainInfoAddFormItem.type">
          <Radio label="1">个人</Radio>
          <Radio label="2">企业</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="域名所有者：" prop="ownerName" :label-width="120">
        <Input v-model="domainInfoAddFormItem.ownerName" placeholder="2-10个汉字" style="width: 320px;"></Input>
      </FormItem>
      <FormItem label="管理联系人：" prop="manageName" :label-width="120">
        <Input v-model="domainInfoAddFormItem.manageName" placeholder="2-10个汉字" style="width: 320px;"></Input>
      </FormItem>
      <FormItem label="邮箱地址：" prop="manageName" :label-width="120">
        <Input v-model="domainInfoAddFormItem.mail" placeholder="" style="width: 320px;"></Input>
      </FormItem>
      <FormItem label="所属地区：" prop="provinceId" :label-width="120">
        <Select @on-change="provinceChange" v-model="domainInfoAddFormItem.provinceId" style="width:97px" placeholder="- 省份 -">
          <Option v-for="(item, index) in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="cityId">
        <Select @on-change="cityChange" v-model="domainInfoAddFormItem.cityId" style="width:97px" placeholder="- 城市 -">
          <Option value="">- 城市 -</Option>
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="areaId">
        <Select v-model="domainInfoAddFormItem.areaId" style="width:97px" placeholder="- 区域 -">
          <Option value=""> - 区域 -</Option>
          <Option v-for="item in areaList" :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="address" label="通讯地址：" :label-width="120">
        <Input v-model="domainInfoAddFormItem.address" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 3 }"
               style="width: 320px;" placeholder="限32个汉字" :maxlength="32"></Input>
      </FormItem>
      <FormItem prop="postcode" label="邮政编码：" :label-width="120">
        <Input v-model="domainInfoAddFormItem.postcode" placeholder="6位数字的邮编" style="width: 320px;" :maxlength="6"></Input>
      </FormItem>
      <FormItem prop="phone" label="手机：" :label-width="120">
        <Input v-model="domainInfoAddFormItem.phone" placeholder="手机号码" style="width: 320px;" :maxlength="11">
        <span slot="prepend">{{domainInfoAddFormItem.phonePrefix}}</span>
        </Input>
      </FormItem>
      <FormItem prop="areaCode" label="联系电话：" :label-width="120">
        <Input v-model="domainInfoAddFormItem.areaCode" placeholder="区号" :maxlength="4" style="width: 70px;"></Input>
      </FormItem>
      <FormItem prop="contactNumber">
        <Input v-model="domainInfoAddFormItem.contactNumber" placeholder="联系电话" style="width: 237px;"
               :maxlength="10"></Input>
      </FormItem>
    </Form>
    <div style="text-align: right;">
      <Button type="primary" @click="handleSubmit('domainInfoAddFormItem')" class="mr10">确定</Button>
      <Button type="ghost" @click="closeAdd" style="margin-right: 25px;">取消</Button>
    </div>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";
  export default {
    data() {
      const validateProvince = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择省份'));
        }
        callback();
      };
      const validateCity = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择城市'));
        }
        callback();
      };
      const validateArea = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择区域'));
        }
        callback();
      };
      const validateAreaCode = (rule, value, callback) => {
          if (this.domainInfoAddFormItem.contactNumber != '' && this.domainInfoAddFormItem.contactNumber != null) {
            if (value === '') {
              callback(new Error('请输入区号'));
            }
          }
        callback();
      };
      const validateContactNumber = (rule, value, callback) => {
          if (this.domainInfoAddFormItem.areaCode != '' && this.domainInfoAddFormItem.areaCode != null) {
            if (value === '') {
              callback(new Error('请输入联系电话'));
            }
          }
        callback();
      };
      return {

        ruleValidate: {
          ownerName: [
            {required: true, message: '请输入完整的名称', trigger: 'blur'}
          ],
          manageName: [
            {required: true, message: '请输入完整的名称', trigger: 'blur'}
          ],
          mail: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'}
          ],
          provinceId: [
            {required: true, validator: validateProvince, trigger: 'change'}
          ],
          cityId: [
            {required: true, validator: validateCity, trigger: 'change'}
          ],
          areaId: [
            {required: true, validator: validateArea, trigger: 'change'}
          ],
          address: [
            {required: true, message: '请输入完整的地址', trigger: 'blur'}
          ],
          postcode: [
            {required: true, message: '请输入邮编', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          areaCode: [
            {validator: validateAreaCode, trigger: 'blur'}
          ],
          contactNumber: [
            {validator: validateContactNumber, trigger: 'blur'}
          ],
        },

        provinceList: [],
        cityList: [],
        areaList: [],
        domainInfoAddFormItem: {
          type: 1,
          ownerName: '',
          manageName: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          address: '',
          postcode: '',
          phonePrefix: '086',
          phone: '',
          areaCode: '',
          contactNumber: '',
          mail: '',
        },
      }
    },
    methods: {
      getInfo() {
        let t = this;
        Api.getAddressListByParentId(1).then(response => {
          if (response.code == 200) {
            t.provinceList = response.dataMap;
          }
        });
      },
      provinceChange() {
        let t = this;
        Api.getAddressListByParentId(t.domainInfoAddFormItem.provinceId).then(response => {
          if (response.code == 200) {
            t.cityList = response.dataMap;
          }
        });
      },
      cityChange() {
        let t = this;
        Api.getAddressListByParentId(t.domainInfoAddFormItem.cityId).then(response => {
          if (response.code == 200) {
            t.areaList = response.dataMap;
          }
        });
      },

      handleSubmit (name) {
        let t = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            Api.createDomainUserInfo(t.domainInfoAddFormItem).then(response => {
              if (response.code == 200) {
                Util.showNotificationBox('success', '添加成功!');
                this.$emit("listenAddEvent", true);
              }
            });
          } else {
          }
        })
      },
      closeAdd() {
        this.$emit("listenAddEvent", false);
      }
    }
  }
</script>
