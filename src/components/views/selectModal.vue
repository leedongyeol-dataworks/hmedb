<template>
    <div v-if="show" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <h3>Select Box Type</h3>
        <button @click="selectBox('box-1')">Box 1 (1/4 width)</button>
        <button @click="selectBox('box-4')">Box 4 (Full width)</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean
    },
    emits: ['close', 'select'],
    methods: {
      close() {
        this.$emit('close');
      },
      selectBox(type) {
        this.$emit('select', type);
        this.close();
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    z-index: 5;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  button {
    margin: 10px;
    padding: 10px;
  }
  </style>
  