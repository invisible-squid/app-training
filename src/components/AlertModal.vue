<script setup lang="ts">
  import type {
    AlertMessageObj,
    AlertPayload,
  } from '@/typings/modal.interfaces';
  import { AlertType } from '@/enums/jsonSpec.enums';
  import { emit, listen } from '@tauri-apps/api/event';
  import FormInput from '@/components/form/FormInput.vue';
  import { computed, ref, watch } from 'vue';

  interface AlertModalProps {
    show: boolean;
    alertMessageObj: AlertMessageObj;
  }

  const props = withDefaults(defineProps<AlertModalProps>(), {
    show: false,
  });

  const payloadInput = ref<string>('');
  const isSubmitDisabled = ref<boolean>(true);

  const alertModalEmit = defineEmits<{
    (e: 'dismissClick'): void;
  }>();

  const alertMessageInputInvalid = computed(
    (): boolean => payloadInput.value === '',
  );

  const alertMessageHelper = computed((): string => {
    let helpText = '';
    if (props.alertMessageObj.inputHelper) {
      helpText = alertMessageInputInvalid.value
        ? props.alertMessageObj.inputHelper
        : '';
    }
    return helpText;
  });

  const okClick = (): void => {
    const payload: AlertPayload = props.alertMessageObj.payload;
    payload.payloadInput =
      props.alertMessageObj.alertType === AlertType.Input
        ? payloadInput.value
        : '';
    emit('alert', payload);
    dismissClick();
  };

  const dismissClick = (): void => {
    payloadInput.value = '';
    alertModalEmit('dismissClick');
  };

  watch(
    () => [alertMessageInputInvalid.value],
    (newVals) => {
      isSubmitDisabled.value = !newVals.every((v) => v === false);
    },
  );
</script>

<template>
  <div id="Alert" class="modal alert" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="modal-header">
          <p>
            <strong>{{ alertMessageObj.title }}</strong>
          </p>
        </div>
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                {{ alertMessageObj.message }}
              </p>
            </div>
          </div>
        </article>

        <div
          v-if="alertMessageObj.alertType === AlertType.Input"
          class="text-block"
        >
          <FormInput
            v-model="payloadInput"
            :is-invalid="alertMessageInputInvalid"
            :invalidMessage="alertMessageHelper"
            :inputLabel="alertMessageObj.inputLabel"
            :inputPlaceholder="alertMessageObj.inputPlaceholder"
            data-test="alert_modal_input"
          />
        </div>

        <div class="button-block">
          <button
            v-if="alertMessageObj.alertType === AlertType.Input"
            class="button"
            :class="{
              'is-success': alertMessageObj.messageType === 'success',
              'is-info': alertMessageObj.messageType === 'info',
              'is-warning': alertMessageObj.messageType === 'warn',
              'is-danger': alertMessageObj.messageType === 'danger',
            }"
            :disabled="isSubmitDisabled"
            @click="okClick"
          >
            Submit
          </button>
          <button
            v-if="alertMessageObj.alertType !== AlertType.Input"
            class="button"
            :class="{
              'is-success': alertMessageObj.messageType === 'success',
              'is-info': alertMessageObj.messageType === 'info',
              'is-warning': alertMessageObj.messageType === 'warn',
              'is-danger': alertMessageObj.messageType === 'danger',
            }"
            @click="okClick"
          >
            OK</button
          >&nbsp;
          <button class="button" @click="dismissClick">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  .modal-header {
    p {
      font-size: 24px;
    }
  }
  .text-block {
    margin: 10px 0;
  }
</style>
