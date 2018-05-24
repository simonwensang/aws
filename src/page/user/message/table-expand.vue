<template>
  <div>
    <Row>{{ content }}</Row>
  </div>
</template>
<script>
  import Api from "../../../store/Api";

  export default {
    props: {
      row: Object
    },
    data() {
      return {
        content: null
      }
    },
    mounted() {
      let t = this;
      Api.getUserMessageContent(t.row.id).then(response => {
        if (response.code == 200) {
          t.content = response.dataMap.content;
        }

      });
      if (!t.row.isRead) {
        Api.userMessageRead([t.row.id]).then(response => {});
      }

    }
  };
</script>
