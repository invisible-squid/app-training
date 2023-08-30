<script setup lang="ts">
  import type { InfoModalObj } from '@/typings/modal.interfaces';

  interface InfoModalProps {
    show: boolean;
    infoModalObj: InfoModalObj;
  }

  const props = withDefaults(defineProps<InfoModalProps>(), {
    show: false,
  });

  const emit = defineEmits<{
    (e: 'dismissClick'): void;
  }>();

  const dismissClick = (): void => {
    emit('dismissClick');
  };
</script>
<template>
  <div id="Info" class="modal alert" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" data-test="info_modal_title">
          {{ infoModalObj.title }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="dismissClick"
        ></button>
      </header>

      <section class="modal-card-body">
        <div class="box">
          <p data-test="info_modal_name" class="info-name">
            {{ infoModalObj.name }}
          </p>
          <div
            v-for="(info, index) in infoModalObj.infoArray"
            :key="index"
            class="is-flex is-flex-direction-row"
          >
            <div class="label-row">
              <label data-test="info_modal_label" class="info-label"
                >{{ info.label }}:</label
              >
            </div>
            <div class="data-row">
              <p data-test="info_modal_data" class="info-data">
                {{ info.data }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger is-medium" @click="dismissClick">
          Close
        </button>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/styles/app.scss';
  .modal-card-head {
    padding: 10px;
    .modal-card-title {
      padding-left: 20px;
    }
  }

  .modal-card-foot {
    padding: 5px;
  }

  .box {
    padding-top: 0px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .is-flex.is-flex-direction-row {
    width: 100%;
  }

  .info-name {
    margin-bottom: 20px;
    font-weight: $weight-bold;
    font-size: 20px;
  }

  .label-row {
    width: 50%;
    text-align: right;
    .info-label {
      margin-right: 10px;
      font-weight: $weight-semibold;
      font-size: 18px;
    }
  }

  .data-row {
    width: 50%;
    text-align: left;
    .info-data {
      font-size: 18px;
    }
  }
</style>
