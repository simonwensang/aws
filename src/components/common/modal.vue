<template>
  <Modal v-model="model" :title="modalTitle" @on-ok="okModal" @on-cancel="cancelModal">
    <p>{{modalText}}</p>
  </Modal>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: ['modalText', 'modalTitle', 'model'],
    methods: {
      okModal() {
        this.$emit('okModal');
      },
      cancelModal() {
        this.$emit('cancelModal');
      }
    }
  }
</script>
