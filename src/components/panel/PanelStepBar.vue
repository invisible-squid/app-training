<script setup lang="ts">
  import type { StatusStep } from '@/typings/component.interfaces';
  interface StatusBarProps {
    steps: Array<StatusStep>;
    size?: string;
  }

  /*
    ALLOWED SIZES
    - 'small'
    - '' (regular - not specified)
    - 'medium'
    - 'large'
  */

  const props = withDefaults(defineProps<StatusBarProps>(), {
    size: '',
  });

  const emit = defineEmits<{
    (e: 'click', step: StatusStep): void;
  }>();

  const stepClicked = (step: StatusStep): void => {
    emit('click', step);
  };
</script>

<template>
  <ul
    class="steps"
    :class="{
      'is-small': size === 'small',
      'is-medium': size === 'medium',
      'is-large': size === 'large',
    }"
  >
    <li
      v-for="(step, index) in steps"
      :key="index"
      class="step-item"
      :class="{
        'is-success': step.style === 'success',
        'is-info': step.style === 'info',
        'is-warning': step.style === 'warning',
        'is-danger': step.style === 'danger',
        'is-active': step.state === 'active',
        'is-completed': step.state === 'completed',
        'is-clickable': step.clickable,
      }"
      @click="stepClicked(step)"
    >
      <div class="step-marker">
        <font-awesome-icon
          v-if="step.markerIcon"
          :icon="[step.markerIcon.iconType, step.markerIcon.iconName]"
        />
        <span v-else>{{ step.markerLabel ?? '' }}</span>
      </div>
      <div class="step-details">
        <p class="step-title">{{ step.title }}</p>
        <p>{{ step.desc ?? '' }}</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';
  @import '@/styles/stepBar/step_bar.scss';

  ul {
    &.steps {
      margin-top: 10px;
    }
  }
</style>
