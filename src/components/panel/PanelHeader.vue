<script setup lang="ts">
  import type { PanelButton } from '@/typings/form.interfaces';

  interface PanelHeaderProps {
    panelHeaderButtons?: PanelButton[];
  }

  const props = defineProps<PanelHeaderProps>();

  const emit = defineEmits<{
    (e: 'panelButtonClick', button: PanelButton): void;
  }>();

  const panelButtonClick = (button: PanelButton): void => {
    emit('panelButtonClick', button);
  };
</script>

<template>
  <div class="panel-block panel-header">
    <div v-if="panelHeaderButtons && panelHeaderButtons.length">
      <span v-for="(button, index) in panelHeaderButtons" :key="index">
        <button
          class="button is-success"
          :data-test="button.dataTest"
          @click="panelButtonClick(button)"
        >
          {{ button.label }}
        </button>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .button {
    width: 278px;
  }
</style>
