<script setup lang="ts">
  import type { SelectOptions } from '@/typings/form.interfaces'

  interface FormRadioProps {
    fieldId?: string;
    radioGroupName?: string;
    radioGroupLabel?: string;
    radioOptions: SelectOptions[];
    modelValue: boolean;
  }

  const props = withDefaults(defineProps<FormRadioProps>(), {
    fieldId: '',
    radioGroupName: 'radioGroup',
    radioGroupLabel: 'Label',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', targetValue: boolean): void;
  }>();

  const radioChanged = (event: Event): void => {
    // `target` is of type `EventTarget | null`
    if (event.target) {
      const { target } = event;
      // `EventTarget` does not inherit from specific class. Has no `value`...
      let forcedBool = false;
      // Cast `target` to implicit `HTMLFormElement` type, which DOES have `value`...
      // `value` will always be a string. Force to conform to boolean
      if ((target as HTMLFormElement).value === 'true') {
        forcedBool = true;
      } else {
        // We got some string other than "true"
      }

      emit('update:modelValue', forcedBool);
    }
  };
</script>

<template>
  <div class="field is-horizontal">
    <label class="field-label is-medium">{{ radioGroupLabel }}:</label>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <label
            v-for="(radioOption, index) in radioOptions"
            :key="index"
            class="radio field-label is-medium"
          >
            <!--
              NOTE: A radio value is ALWAYS read as a string.
              Must implicitly convert.
            -->
            <input
              :id="fieldId"
              type="radio"
              :name="radioGroupName"
              :value="radioOption.data"
              :checked="modelValue == radioOption.data"
              @change="radioChanged($event)"
            />
            {{ radioOption.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';
</style>
