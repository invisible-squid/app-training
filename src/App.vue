<script setup lang="ts">
  import AlertModal from '@/components/AlertModal.vue';
  import InfoModal from '@/components/InfoModal.vue';
  import Message from '@/components/Message.vue';

  import { useMainStore } from '@/store/main';
  const mainStore = useMainStore();

  const dismissAlertModalClick = (): void => {
    mainStore.setIsAlertModalActive(false);
  };

  const dismissMessageClick = (): void => {
    mainStore.setIsMessageActive(false);
  };

  const dismissInfoClick = (): void => {
    mainStore.setIsInfoModalActive(false);
  };
</script>

<template>
  <div id="App">
    <AlertModal
      v-if="mainStore.alertMessageObj"
      :show="mainStore.isAlertModalActive"
      :alertMessageObj="mainStore.alertMessageObj"
      @dismissClick="dismissAlertModalClick"
    />

    <InfoModal
      v-if="mainStore.infoModalObj"
      :show="mainStore.isInfoModalActive"
      :infoModalObj="mainStore.infoModalObj"
      @dismissClick="dismissInfoClick"
    />

    <Message
      v-if="mainStore.messageObj"
      :show="mainStore.isMessageActive"
      :messageObj="mainStore.messageObj"
      @dismissClick="dismissMessageClick"
    />
    <router-view />
  </div>
</template>

<style lang="scss">
  @import '@/styles/app.scss';

  #App {
    height: 100vh;
    background: linear-gradient(135deg, #8ec6eb, #ebf8e1, #f9e19c);
    overflow: auto;
  }
</style>
