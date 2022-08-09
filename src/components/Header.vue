<template>
  <div class="header">
    <h1 class="text-3xl font-bold">
      header
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HedaerComp',
  components: {},
});
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  border-bottom: 1px solid #2c3e50;
}

</style>
