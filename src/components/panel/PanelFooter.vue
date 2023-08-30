<script setup lang="ts">
  // TYPES
  import type { PanelButton } from '@/typings/form.interfaces';

  interface PanelFooterProps {
    panelFooterButtons?: PanelButton[];
  }

  const props = defineProps<PanelFooterProps>();

  const emit = defineEmits<{
    (e: 'panelButtonClick', button: PanelButton): void;
  }>();

  const panelButtonClick = (button: PanelButton): void => {
    emit('panelButtonClick', button);
  };
</script>

<template>
  <div class="panel-block panel-footer">
    <div v-if="panelFooterButtons && panelFooterButtons.length">
      <span v-for="(button, index) in panelFooterButtons" :key="index">
        <button
          class="button is-outlined"
          :class="{
            'is-success': button.style === 'success',
            'is-warning': button.style === 'warning',
            'is-danger': button.style === 'danger',
            'is-active': button.style === 'active',
            'is-completed': button.style === 'completed',
            'is-info': !button.style,
            'is-outlined': !button.style,
          }"
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
  @import '@/styles/app.scss';
  .panel-footer {
    background-color: $very-light-blue-gray;
    height: 40px;
  }

  .button {
    margin-right: 7px;
  }
</style>
