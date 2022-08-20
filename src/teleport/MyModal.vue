<template>
  <div class="modal-container" @keydown.esc="hide" tabindex="0" v-if="isOpen">
    <div class="modal-wrapper">
      <div class="title-bar">
        <slot name="title"></slot>
        <span class="close" @click="hide" @keyup.esc="hide">&times;</span>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits } from 'vue';

interface Emits {
  (e: 'close'): void;
}

const emit = defineEmits<Emits>();

const isOpen = ref<boolean>(false);

const hide = () => {
  isOpen.value = false;
  emit('close');
};
const show = () => {
  isOpen.value = true;
};

defineExpose({
  hide,
  show,
  isOpen,
});
</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  background-color: #ffffff;
  margin: 15% auto;
  padding: 20px 30px 50px 30px;
  width: 500px;
  border: 1px solid #888;
  border-radius: 6px;
  display: flex;
  flex-direction: column;

  .title-bar {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 28px;
    font-weight: 600;

    .close {
      cursor: pointer;
      color: #aaa;
      font-size: 28px;
      font-weight: bold;
    }
  }

}

</style>
