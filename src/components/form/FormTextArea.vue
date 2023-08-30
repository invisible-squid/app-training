<script setup lang="ts">
  interface FormTextAreaProps {
    inputLabel?: string;
    inputPlaceholder?: string;
    inputType?: string;
    isDisabled?: boolean;
    invalidMessage?: string;
    modelValue: string;
  }

  const props = withDefaults(defineProps<FormTextAreaProps>(), {
    inputLabel: 'Label',
    inputPlaceholder: '',
    inputType: 'text',
    isDisabled: false,
    invalidMessage: 'text',
  });

  const textChanged = (event: Event): void => {
    if (event.target) {
      const { target } = event;
      const targetValue = (target as HTMLFormElement).value;
      emit('update:modelValue', targetValue);
    }
  };

  const emit = defineEmits<{
    (e: 'update:modelValue', targetValue: string): void;
  }>();
</script>

<template>
  <div class="field is-horizontal">
    <label class="field-label is-medium">{{ inputLabel }}:</label>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <textarea
            class="textarea is-medium"
            :disabled="isDisabled"
            :class="{
              'is-danger': invalidMessage,
            }"
            :type="inputType"
            :placeholder="inputPlaceholder"
            :value="modelValue"
            @input="textChanged"
          ></textarea>
        </p>
        <p v-if="invalidMessage" class="help is-danger">
          {{ invalidMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';
</style>
