<style rel="stylesheet/scss" scoped>
</style>
<template>
  <div style="background: #fff;" class="p20">
    <Form ref="domainInfoEditFormItem" :rules="ruleValidate" :model="domainInfoEditFormItem" inline>
      <FormItem label="所有者类型：" :label-width="120">
        <RadioGroup v-model="domainInfoEditFormItem.type">
          <Radio label="1">个人</Radio>
          <Radio label="2">企业</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="域名所有者：" prop="ownerName" :label-width="120">
        <Input v-model="domainInfoEditFormItem.ownerName" placeholder="2-10个汉字" style="width: 320px;"></Input>
      </FormItem>
      <FormItem label="管理联系人：" prop="manageName" :label-width="120">
        <Input v-model="domainInfoEditFormItem.manageName" placeholder="2-10个汉字" style="width: 320px;"></Input>
      </FormItem>
      <FormItem label="邮箱地址：" prop="manageName" :label-width="120">
        <Input v-model="domainInfoEditFormItem.mail" placeholder="" style="width: 320px;"></Input>
      </FormItem>
      <FormItem label="所属地区：" prop="provinceId" :label-width="120">
        <Select @on-change="provinceChange" v-model="domainInfoEditFormItem.provinceId" style="width:97px" placeholder="- 省份 -">
          <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="cityId">
        <Select @on-change="cityChange" v-model="domainInfoEditFormItem.cityId" style="width:97px" placeholder="- 城市 -">
          <Option value="">- 城市 -</Option>
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="areaId">
        <Select v-model="domainInfoEditFormItem.areaId" style="width:97px" placeholder="- 区域 -">
          <Option value=""> - 区域 -</Option>
          <Option v-for="item in areaList" :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="address" label="通讯地址：" :label-width="120">
        <Input v-model="domainInfoEditFormItem.address" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 3 }"
               style="width: 320px;" placeholder="限32个汉字" :maxlength="32"></Input>
      </FormItem>
      <FormItem prop="postcode" label="邮政编码：" :label-width="120">
        <Input v-model="domainInfoEditFormItem.postcode" placeholder="6位数字的邮编" style="width: 320px;" :maxlength="6"></Input>
      </FormItem>
      <FormItem prop="phone" label="手机：" :label-width="120">
        <Input v-model="domainInfoEditFormItem.phone" placeholder="手机号码" style="width: 320px;" :maxlength="11">
        <span slot="prepend">{{domainInfoEditFormItem.phonePrefix}}</span>
        </Input>
      </FormItem>
      <FormItem prop="areaCode" label="联系电话：" :label-width="120">
        <Input v-model="domainInfoEditFormItem.areaCode" placeholder="区号" :maxlength="4" style="width: 70px;"></Input>
      </FormItem>
      <FormItem prop="contactNumber">
        <Input v-model="domainInfoEditFormItem.contactNumber" placeholder="联系电话" style="width: 237px;"
               :maxlength="10"></Input>
      </FormItem>
    </Form>
    <div style="text-align: right;">
      <Button type="primary" @click="handleSubmit('domainInfoEditFormItem')" class="mr10">确定</Button>
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
        if (this.domainInfoEditFormItem.contactNumber != '' && this.domainInfoEditFormItem.contactNumber != null) {
          if (value === '') {
            callback(new Error('请输入区号'));
          }
        }
        callback();
      };
      const validateContactNumber = (rule, value, callback) => {
        if (this.domainInfoEditFormItem.areaCode != '' && this.domainInfoEditFormItem.areaCode != null) {
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
        domainInfoEditFormItem: {
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
        flag: false,
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
        Api.getAddressListByParentId(t.domainInfoEditFormItem.provinceId).then(response => {
          if (response.code == 200) {
            let flag = false;
            for (let i = 0; i < response.dataMap.length; i++) {
              if (response.dataMap[i].id == t.domainInfoEditFormItem.cityId) {
                flag = true;
              }
              if (!flag) {
                t.domainInfoEditFormItem.cityId = response.dataMap[0].id;
              }
            }
            t.cityList = response.dataMap;
          }
        });
      },
      cityChange() {
        let t = this;
        Api.getAddressListByParentId(t.domainInfoEditFormItem.cityId).then(response => {
          if (response.code == 200) {
            let flag = false;
            for (let i = 0; i < response.dataMap.length; i++) {
              if (response.dataMap[i].id == t.domainInfoEditFormItem.areaId) {
                flag = true;
              }
              if (!flag) {
                t.domainInfoEditFormItem.areaId = response.dataMap[0].id;
              }
            }
            t.areaList = response.dataMap;
          }
        });
      },

      handleSubmit (name) {
        let t = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (t.flag) {
              Api.createDomainUserInfo(t.domainInfoEditFormItem).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '新增成功!');
                  this.$emit("listenAddEvent", true);
                }
              });
            } else {
              Api.updateDomainUserInfo(t.domainInfoEditFormItem).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '修改成功!');
                  this.$emit("listenAddEvent", true);
                }
              });
            }
          } else {
          }
        })
      },
      closeAdd() {
        this.$emit("listenAddEvent", false);
      },
      getDomainInfo(id, flag) {
        let t = this;
        t.getInfo();
        t.flag = flag;
        Api.getDomainUserInfo(id).then(response => {
          if (response.code == 200) {
            t.domainInfoEditFormItem = response.dataMap;
            if (flag) {
              t.domainInfoEditFormItem.id = null;
            }
          }
        });
      }
    }
  }
</script>
