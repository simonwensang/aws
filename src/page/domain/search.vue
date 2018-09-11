<style rel="stylesheet/scss" scoped>
  .domain-detailed-list {
    border: 1px solid #ddd;
    width: 300px;
    border-radius: 5px;
  }

  .domain-detailed-list .domain-list-title {
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
  }

  .domain-detailed-list .domain-list-title h4 {
    line-height: 60px;
    font-size: 16px;
    font-weight: normal;
  }

  .domain-detailed-list .domain-detailed-body .domain-detailed-empty {
    background: url(../../assets/detailed_tip.png) 50% 30px no-repeat;
    color: #0099cc;
    text-align: center;
    padding-top: 124px;
    height: 170px;
    overflow: hidden;
  }

  .domain-detailed-list .domain-detailed-foot {
    border-top: 1px solid #ddd;
    height: 70px;
    padding: 0 20px;
  }

  .domain-detailed-list .domain-detailed-foot .domain-sum {
    line-height: 70px;
    font-size: 14px;
  }

  .domain-detailed-list .domain-detailed-foot .domain-sum .red {
    font-size: 22px;
  }

  .domain-detailed-list .domain-detailed-foot .domain-submit {
    margin-top: 17px;
  }

  .domain-search .ivu-input-large {
    width: calc(100% - 140px);
  }

  .search-btn {
    height: 36px;
    line-height: 36px;
    padding: 0;
    font-size: 20px;
    font-weight: normal;
    background: #57a3f3;
    width: 140px;
    border: 0;
    border-radius: 0;
  }

  .domain-card {
    cursor: default;
    padding: 0 10px 20px;
  }

  .domain-card:hover .domain-card-inner {
    border-color: #108cee;
  }

  .domain-card .domain-card-inner {
    border: 1px solid #e8ecef;
    padding: 10px;
  }

  .domain-card .domain-card-inner .domain-card-top {
    height: 35px;
    overflow: hidden;
    padding-bottom: 5px;
  }

  .domain-card .domain-card-inner .domain-card-top .root {
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    color: #666;
    float: left;
    max-width: 80px;
  }

  .domain-card .domain-card-inner .domain-card-top .price {
    font-size: 18px;
    line-height: 30px;
    float: right;
    color: #eb2d2d;
  }

  .domain-card .domain-card-inner .domain-card-top .origin-price {
    font-size: 12px;
    line-height: 32px;
    height: 30px;
    padding-right: 5px;
    color: #999;
    float: right;
    text-decoration: line-through;
  }

  .result-panel {
    width: 100%;
    border: 1px solid #e5e5e5;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    vertical-align: top;
  }

  .result-panel .result-title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 20px;
    background-color: #f5f5f5;
    font-size: 12px;
  }

  .result-panel .result-body {
    padding: 0 30px;
  }

  .result-panel .result-body .domain-box {
    margin: 0 0 23px;
  }

  .result-panel .result-body .domain-box h3 {
    font-size: 14px;
    font-weight: normal;
    line-height: 44px;
    color: #999;
  }

  .result-panel .result-body .domain-item .domain-item-main-info {
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ebebeb;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-left {
    position: absolute;
    height: 60px;
    overflow: hidden;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-left .domain-item-suffix {
    color: #333;
    font-weight: bold;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-left .domain-item-status {
    margin: 0 10px;
    font-size: 12px;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-left .domain-item-description {
    color: #999;
    margin: 0 10px;
    width: 230px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-origin-price {
    color: #999;
    margin-right: 10px;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-origin-price span {
    text-decoration: line-through;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-first-price span {
    color: #f39800;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-left .domain-item-status:before {
    content: '(';
    display: inline;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-left .domain-item-status:after {
    content: ')';
    display: inline;
  }

  .result-panel .result-body .domain-item.status-unregistered .domain-item-left .domain-item-status {
    color: #46be0b;
  }

  .result-panel .result-body .domain-item.status-registered .domain-item-left .domain-item-status {
    color: #666;
  }

  .result-panel .result-body .domain-item.status-loading .domain-item-left .domain-item-status, .result-panel .result-body .domain-item.status-unknown .domain-item-left .domain-item-status {
    color: #f0a608;
  }

  .result-panel .result-body .domain-item.status-forbidden .domain-item-left .domain-item-status {
    color: #ff4d5e;
  }

  .result-panel .result-body .domain-item .domain-item-operation-loading {
    color: #f0a608;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .tojoin-btn, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .retry-btn, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .joined-btn {
    color: #108cee;
    display: block;
    width: 78px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #108cee;
    background-color: #fff;
    text-decoration: none;
    text-align: center;
    margin: 15px 0;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .tojoin-btn:visited, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .retry-btn:visited, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .joined-btn:visited {
    color: #108cee;
    background-color: #fff;
  }

  .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .tojoin-btn:hover, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .retry-btn:hover, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .joined-btn:hover, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .tojoin-btn:active, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .retry-btn:active, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .joined-btn:active, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .tojoin-btn:focus, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .retry-btn:focus, .result-panel .result-body .domain-item .domain-item-main-info .domain-item-right .domain-item-operation .joined-btn:focus {
    color: #fff;
    background-color: #108cee;
  }

  .purchase-body .ui-purchasebox-body {
    max-height: 300px;
    overflow-y: auto;
  }

  .purchase-body .ui-purchasebox-body .ui-purchasebox-domain-item {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    overflow: hidden;
  }

  .purchase-body .ui-purchasebox-body .ui-purchasebox-domain-item .ui-purchasebox-domain-name {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
    float: left;
    font-size: 14px;
  }

  .purchase-body .ui-purchasebox-body .ui-purchasebox-domain-item .ui-purchasebox-domain-duration {
    margin-right: 15px;
  }
</style>
<template>
  <div style="background: #fff;position: relative;">
    <Row>
      <Steps :current="0" class="fr" style="margin: 20px 20px 0;top: 20px;width: 700px;">
        <Step title="添加订单"></Step>
        <Step title="提交资料"></Step>
        <Step title="确认订单"></Step>
        <Step title="在线支付"></Step>
        <Step title="支付成功"></Step>
      </Steps>
    </Row>
    <Row class="mt20 pt20 pb20" style="border-top: 1px solid #ddd;">
      <div class="ml20 mt20 fl" style="width: calc(100% - 360px);">
        <Form ref="formItem">
          <FormItem prop="user">
            <Input class="domain-search" size="large" v-model="domainName" style="width: calc(100% - 140px);"
                   placeholder="请输入要查询的域名，如baidu.com；也可不输入后缀，如baidu，系统将为您批量查询所有后缀的域名" autofocus></Input>
            <Button type="primary" class="fr search-btn" @click="submitForm()">查询</Button>
          </FormItem>
        </Form>
        <div v-if="flag">
          <p>更多国际、国内域名、新顶级域名、中文域名火爆促销中，
            <router-link :to="'/domain/price'">点击查看详情>></router-link>
          </p>
          <Row class="mt20">
            <Col span="6" class="domain-card" v-for="(item, index) in discountList" :key="index">
            <div class="domain-card-inner">
              <p class="domain-card-top">
                <span class="root" :title="item.name">{{item.name}}</span>
                <span class="price">￥<strong>{{item.price}}</strong></span>
                <span class="origin-price">{{item.originPrice}}</span>
              </p>
              <p class="domain-card-bottom">
                <span class="description" :title="item.description">{{item.description}}</span>
              </p>
            </div>
            </Col>
          </Row>
        </div>
        <div v-else class="result-panel">
          <div class="result-title">查询结果</div>
          <div class="result-body">
            <div class="domain-box">
              <h3>常用域名后缀</h3>
              <div class="domain-content">
                <div v-for="(item, index) in commonDomainList"
                     :class="{ 'domain-item' : true,'status-loading' : item.status == 'LOADING', 'status-registered' : item.status == 'REGISTERED', 'status-unregistered' : item.status == 'UNREGISTERED' || item.status == 'JOINED'}">
                  <div class="domain-item-main-info">
                    <div class="domain-item-left">
                      <div class="domain-item-suffix fl">{{item.name}}</div>
                      <div class="domain-item-status fl">
                        <span v-if="item.status == 'LOADING'">加载中...</span>
                        <span v-else-if="item.status == 'REGISTERED'">已注册</span>
                        <span v-else>未注册</span>
                      </div>
                      <div class="domain-item-description fl">{{item.description}}</div>
                    </div>
                    <div class="domain-item-right fr">
                      <div class="domain-item-origin-price fl"><label>原价：</label><span
                        data-id="originPrice">￥{{item.originPrice}}</span>
                      </div>
                      <div class="domain-item-first-price fl"><label>现价：</label><span>￥{{item.price}}</span>
                      </div>
                      <div class="domain-item-operation fl ml10">
                        <span class="domain-item-operation-loading" v-if="item.status == 'LOADING'">数据加载中...</span>
                        <span v-else-if="item.status == 'REGISTERED'">-</span>
                        <a v-else-if="item.status == 'UNREGISTERED'" class="tojoin-btn" href="javascript:;"
                           @click="joinList(item, index, 1)">加入清单</a>
                        <a v-else-if="item.status == 'JOINED'" class="joined-btn" href="javascript:;">已添加</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="domain-box">
              <h3>推荐域名后缀</h3>
              <div class="domain-content"></div>
              <div v-for="(item, index) in recommendDomainList"
                   :class="{ 'domain-item' : true,'status-loading' : item.status == 'LOADING', 'status-registered' : item.status == 'REGISTERED', 'status-unregistered' : item.status == 'UNREGISTERED' || item.status == 'JOINED'}">
                <div class="domain-item-main-info">
                  <div class="domain-item-left">
                    <div class="domain-item-suffix fl">{{item.name}}</div>
                    <div class="domain-item-status fl">
                      <span v-if="item.status == 'LOADING'">加载中...</span>
                      <span v-else-if="item.status == 'REGISTERED'">已注册</span>
                      <span v-else>未注册</span>
                    </div>
                    <div class="domain-item-description fl">{{item.description}}</div>
                  </div>
                  <div class="domain-item-right fr">
                    <div class="domain-item-origin-price fl"><label>原价：</label><span
                      data-id="originPrice">￥{{item.originPrice}}</span>
                    </div>
                    <div class="domain-item-first-price fl"><label>现价：</label><span
                      data-id="price">￥{{item.price}}</span>
                    </div>
                    <div class="domain-item-operation fl ml10">
                      <span class="domain-item-operation-loading" v-if="item.status == 'LOADING'">数据加载中...</span>
                      <span v-else-if="item.status == 'REGISTERED'">-</span>
                      <a v-else-if="item.status == 'UNREGISTERED'" class="tojoin-btn" href="javascript:;"
                         @click="joinList(item, index, 2)">加入清单</a>
                      <a v-else-if="item.status == 'JOINED'" class="joined-btn" href="javascript:;">已添加</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fr domain-detailed-list mr20 mt20">
        <div class="domain-list-title">
          <h4 class="fl">域名清单</h4>
          <div class="domain-detailed-count fl">（<span class="domain-count">0</span>）</div>
          <a href="javascript:void(0);" class="detailed-clear fr" v-on:click="removeDomain">清空</a>
        </div>
        <div v-if="domainNameList == null || domainNameList.length == 0" class="domain-detailed-body">
          <div class="domain-detailed-empty">您还没有添加域名</div>
        </div>
        <div v-else class="purchase-body">
          <div v-for="(domain, index) in domainNameList" :key="index" class="ui-purchasebox-body">
            <div class="ui-purchasebox-domain-item">
              <div class="ui-purchasebox-domain-name"><span class="ui-purchasebox-item-name">{{domain.name}}</span>
              </div>
              <a @click="deleteDomain(domain, index)" class="ui-purchasebox-domain-delete fr">
                <Icon type="close"></Icon>
              </a>
              <div class="ui-purchasebox-domain-duration fr">
                <Select @on-change="calcPrice" v-model="domain.year" style="width:70px" size="small">
                  <Option v-for="(item, index) in years" :value="item" :key="index">{{item}}年</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div class="domain-detailed-foot">
          <div class="domain-sum fl">总价：<span class="red domain-total">￥{{price}}</span></div>
          <Button type="primary" :disabled="disabledFlag" @click="toSubmitInfo" class="fr domain-submit">下一步</Button>
        </div>
      </div>
    </Row>

  </div>
</template>
<script>
  import Api from "../../store/Api";

  export default {
    data() {
      return {
        domainName: '',
        discountList: [],
        commonDomainList: [],
        recommendDomainList: [],
        domainNameList: [],
        years: 10,
        price: 0.00,
        flag: true,
        disabledFlag: true,
      }
    },
    created() {
      this.$emit('setNavInfo', '域名注册', 'domainList', 'domain');
      this.getInfo();
    },
    methods: {
      getInfo() {
        Api.getDiscountList(null).then(response => {
          if (response.code == 200) {
            this.discountList = response.dataMap;
          }
        });
      },
      submitForm() {
        let t = this;
        if (t.domainName != '' && t.domainName != undefined && t.domainName != null) {
          Api.domainSearchInfo({name: t.domainName}).then(response => {
            if (response.code == 200) {
              t.commonDomainList = response.dataMap.common;
              t.recommendDomainList = response.dataMap.recommend;
              t.flag = false;

              t.getDomainStatus();
            }
          });
        }
      },
      getDomainStatus() {
        let t = this;
        for (let i = 0; i < t.commonDomainList.length; i++) {
          Api.domainSearchStatus({name: t.commonDomainList[i].name}).then(response => {
            if (response.code == 200) {
              t.commonDomainList[i].status = response.dataMap.status;
            }
          });
        }
        for (let i = 0; i < t.recommendDomainList.length; i++) {
          Api.domainSearchStatus({name: t.recommendDomainList[i].name}).then(response => {
            if (response.code == 200) {
              t.recommendDomainList[i].status = response.dataMap.status;
            }
          });
        }
      },
      joinList(obj, index, type) {
        if (type == 1) {
          this.commonDomainList[index].status = 'JOINED';
        } else if (type == 2) {
          this.recommendDomainList[index].status = 'JOINED';
        }
        obj.year = 1;
        obj.type = type;
        obj.index = index;
        this.domainNameList.push(obj);
        this.calcPrice();
      },
      calcPrice() {
        let price = 0;
        if (this.domainNameList != null && this.domainNameList.length > 0) {
          this.disabledFlag = false;
          for (let i = 0; i < this.domainNameList.length; i++) {
            price += Number(this.domainNameList[i].price) * Number(this.domainNameList[i].year);
          }
        } else {
          this.disabledFlag = true;
        }
        this.price = price;
      },
      deleteDomain(obj, index) {
        if (obj.type == 1) {
          this.commonDomainList[obj.index].status = 'UNREGISTERED';
        } else if (obj.type == 2) {
          this.recommendDomainList[obj.index].status = 'UNREGISTERED';
        }
        this.domainNameList.splice(index, 1);
        this.calcPrice();
      },
      removeDomain() {
        if (this.domainNameList != null && this.domainNameList.length > 0) {
          for (let i = 0; i < this.commonDomainList.length; i++) {
            this.commonDomainList[i].status = 'UNREGISTERED';
          }
          for (let i = 0; i < this.recommendDomainList.length; i++) {
            this.recommendDomainList[i].status = 'UNREGISTERED';
          }
          this.domainNameList = [];
          this.calcPrice();
          this.disabledFlag = true;
        }
      },
      toSubmitInfo() {
        this.$router.push({name: 'domainSubmitInfo', params: { 'domainNameList': this.domainNameList }});
      }
    }
  }
</script>
