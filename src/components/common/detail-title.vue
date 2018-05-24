<style rel="stylesheet/css">
  .common-detail-title {
    border-bottom: 2px solid #eee;
  }
  .common-detail-title h4 {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    color: #333;
    font-size: 16px;
    border-bottom: 2px solid #ccc;
    margin-bottom: -2px;
  }
</style>
<template>
  <div class="common-detail-title">
    <h4>{{title}}</h4>
  </div>
</template>
<script>
  export default {
      props: {
          title: {
              type: String,
              required: true
          }
      }
  }
</script>
