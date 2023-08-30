<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import type { SelectOptions, TestFormData } from '@/typings/form.interfaces';
  import FormInput from '@/components/form/FormInput.vue';
  import FormRadio from '@/components/form/FormRadio.vue';
  import FormSelect from '@/components/form/FormSelect.vue';
  import FormTextArea from '@/components/form/FormTextArea.vue';

  const props = withDefaults(
    defineProps<{
      show: boolean;
      selectOptions: SelectOptions[];
      radioOptions: SelectOptions[];
    }>(),
    {
      show: false,
    },
  );

  const emit = defineEmits<{
    (e: 'dismiss'): void;
    (e: 'exportFormData', testFormData: TestFormData): void;
  }>();
  const inputInvalid = computed((): boolean => testFormData.value.input === '');
  const selectInvalid = computed(
    (): boolean => testFormData.value.input === '',
  );
  const textInvalid = computed((): boolean => testFormData.value.text === '');

  const inputInvalidHelp = computed((): string => {
    return !testFormData.value.input ? 'Enter a value input' : '';
  });
  const inputHelper = ref<string>('this is only a test');
  const selectInvalidHelp = computed((): string => {
    return !testFormData.value.select ? 'Select a value' : '';
  });
  const textInvalidHelp = computed((): string => {
    return !testFormData.value.text ? 'Enter some text' : '';
  });

  const testFormData = ref<TestFormData>({
    input: '',
    radio: true,
    select: '',
    text: '',
  });
  const isExportDisabled = ref<boolean>(true);

  const resetForm = (): void => {
    testFormData.value = {
      input: '',
      radio: true,
      select: '',
      text: '',
    };
  };

  const dismiss = (): void => {
    emit('dismiss');
  };

  const exportFormData = () => {
    emit('exportFormData', testFormData.value);
  };

  watch(
    () => [inputInvalid.value, selectInvalid.value, textInvalid.value],
    (newVals) => {
      isExportDisabled.value = !newVals.every((v) => v === false);
    },
  );

  watch(
    () => props.show,
    () => {
      if (!props.show) {
        resetForm();
      }
    },
  );
</script>
<template>
  <div>
    <div class="modal" :class="{ 'is-active': show }">
      <div class="modal-background"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Test Modal</p>

          <button class="delete" aria-label="close" @click="dismiss"></button>
        </header>

        <section class="modal-card-body">
          <FormInput
            v-model="testFormData.input"
            :invalidMessage="inputInvalidHelp"
            :inputLabel="'Test input'"
            :inputPlaceholder="'Test input'"
          />

          <FormRadio
            v-model="testFormData.radio"
            :radioGroupName="'testRadio'"
            :radioGroupLabel="'Test Radio'"
            :radioOptions="radioOptions"
          />

          <FormSelect
            v-model="testFormData.select"
            :invalidMessage="selectInvalidHelp"
            :selectLabel="'Test Selection'"
            :selectOptions="selectOptions"
          />

          <FormTextArea
            v-model="testFormData.text"
            :invalidMessage="textInvalidHelp"
            :inputLabel="'Test Text Area'"
            :inputPlaceholder="'Test Text Area'"
          />
        </section>

        <footer class="modal-card-foot">
          <button
            class="button is-success is-medium"
            :disabled="isExportDisabled"
            @click="exportFormData"
          >
            Export Form Data
          </button>

          <button class="button is-danger is-medium" @click="dismiss">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '@/styles/app.scss';
</style>
