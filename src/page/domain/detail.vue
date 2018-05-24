<style rel="stylesheet/scss" scoped>
  .detail-title {
    font-size: 16px;
    height: auto;
    line-height: inherit;
    color: #333333;
    padding: 10px 20px;
    display: inline-block;
    zoom: 1;
    border-bottom: none;
    margin: 0;
  }

  .detail-content {
    padding: 20px 30px;
  }

  .detail-content-row {
    height: 30px;
    line-height: 30px;
  }

</style>
<template>
  <div style="background: #fff;">
    <Row style="border-bottom: 1px solid #E8EBEE;">
      <h2 class="detail-title">{{domainName}}</h2>
    </Row>
    <Row class="detail-content">
      <div class="overflow-hidden">
        <detail-title title="基本信息" class="mb10"/>
        <Col class="detail-content-row">
        域名所有者：{{ownerName}}
        </Col>
        <Col span="12" class="detail-content-row">
        注册日期：{{createTime}}
        </Col>
        <Col span="12" class="detail-content-row">
        到期日期：{{expirationTime}}
        </Col>
      </div>
      <div class="mt20">
        <detail-title title="域名信息" class="mb10 mt20"/>
        <Col span="12" class="detail-content-row">
        所有者类型：{{type}}
        </Col>
        <Col span="12" class="detail-content-row">
        联系人：{{manageName}}
        </Col>
        <Col span="12" class="detail-content-row">
        邮箱地址：{{mail}}
        </Col>
        <Col span="12" class="detail-content-row">
        地区：{{area}}
        </Col>
        <Col span="12" class="detail-content-row">
        通信地址：{{address}}
        </Col>
        <Col span="12" class="detail-content-row">
        邮政编码：{{postcode}}
        </Col>
        <Col span="12" class="detail-content-row">
        联系电话：{{contactNumber}}
        </Col>
        <Col span="12" class="detail-content-row">
        手机：{{phone}}
        </Col>
      </div>
      <Button class="mt20" @click="back">返回域名列表</Button>
    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";
  import detailTitle from '../../components/common/detail-title.vue';
  export default {
    components: {
      detailTitle
    },
    data() {
      return {
        id: '',
        domainName: '',
        createTime: '',
        expirationTime: '',

        type: '',
        manageName: '',
        mail: '',
        area: '',
        address: '',
        postcode: '',
        contactNumber: '',
        phone: '',
      }
    },
    mounted(){
      this.$emit('setNavInfo', '域名详情', 'domainList', 'domain');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let t = this;
        let id = t.$route.params.id;
        if (id == undefined || id == null || id == '') {
          t.$router.push({name: 'domainList'});
        }
        t.id = id;
        Api.getDomainDetail(id).then(response => {
          if (response.code == 200) {
            let data = response.dataMap;
            t.domainName = data.name;
            t.ownerName = data.domainUserInfo.ownerName;
            t.createTime = Util.transformTime(data.createTime);
            t.expirationTime = Util.transformTime(data.expirationTime);

            t.type = data.domainUserInfo.type;
            t.manageName = data.domainUserInfo.manageName;
            t.mail = data.domainUserInfo.mail;
            t.area = data.domainUserInfo.provinceName + " " + data.domainUserInfo.cityName + " " + data.domainUserInfo.areaName;
            t.address = data.domainUserInfo.address;
            t.postcode = data.domainUserInfo.postcode;
            t.contactNumber = data.domainUserInfo.contactNumber;
            t.phone = data.domainUserInfo.phone;
          } else if (response.code == 10004) {
            this.$router.push({name: 'domainList'});
          }
        });
      },
      back() {
        this.$router.push({name: 'domainList'});
      }
    }
  }
</script>
