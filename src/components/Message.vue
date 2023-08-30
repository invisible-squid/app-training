<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import type { MessageObj } from '@/typings/modal.interfaces';
  import type { NavigationObj } from '@/typings/jsonSpec.interfaces';

  interface MessageProps {
    show: boolean;
    messageObj: MessageObj;
  }

  const props = withDefaults(defineProps<MessageProps>(), {
    show: false,
  });

  const emit = defineEmits<{
    (e: 'dismissClick'): void;
    (e: 'messageClick', payload: NavigationObj): void;
  }>();

  const isClosing = ref<boolean>(false);
  let startInterval: ReturnType<typeof setTimeout>;

  const dismissClick = (): void => {
    emit('dismissClick');
  };

  const fadeOut = (): void => {
    isClosing.value = true;
    setTimeout(() => dismissClick(), 400);
  };

  const startTimer = (): void => {
    isClosing.value = false;
    startInterval = setTimeout(() => fadeOut(), 4500);
  };

  const messageClick = (): void => {
    if (props.messageObj.payload) {
      const payload = props.messageObj.payload;
      emit('messageClick', payload);
      fadeOut();
    }
  };

  const overMessage = (): void => {
    clearTimeout(startInterval);
  };

  const leaveMessage = (): void => {
    fadeOut();
  };

  watch(
    () => props.show,
    () => {
      if (props.show) {
        startTimer();
      }
    },
  );

  onMounted(() => {
    startTimer();
  });
</script>

<template>
  <article
    class="message"
    :class="{
      'is-active': show,
      'is-success': messageObj.type === 'success',
      'is-info': messageObj.type === 'info',
      'is-warning': messageObj.type === 'warn',
      'is-danger': messageObj.type === 'danger',
      'fade-out': isClosing,
    }"
    data-test="message"
    @mouseover="overMessage"
    @mouseleave="leaveMessage"
  >
    <div class="message-header" data-test="message_header">
      <p>{{ messageObj.title }}</p>
      <button
        class="delete"
        aria-label="delete"
        data-test="message_dismiss_btn"
        @click="dismissClick"
      ></button>
    </div>
    <div class="message-body" data-test="message_body" @click="messageClick">
      {{ messageObj.message }}
    </div>
    <button
      v-if="messageObj.payload"
      class="button"
      :class="{
        'is-success': messageObj.type === 'success',
        'is-info': messageObj.type === 'info',
        'is-warning': messageObj.type === 'warn',
        'is-danger': messageObj.type === 'danger',
      }"
      data-test="message_action_btn"
      @click="messageClick"
    >
      View {{ messageObj.payload.name }}
    </button>
  </article>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  @keyframes fade-in-move-down {
    0% {
      opacity: 0;
      transform: translateY(-3rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .button {
    margin-bottom: 10px;
  }

  .message {
    position: absolute;
    display: none;
    max-width: 640px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
    margin-top: 3px;
    border: 1px $light-gray solid;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
      0 0px 0 1px rgb(10 10 10 / 2%);
    animation: fade-in-move-down 0.5s;

    &.is-active {
      display: block;
    }

    &.fade-out {
      animation: fadeOut ease 0.5s;
    }

    .message-header {
      p {
        font-size: 24px;
      }
    }

    .message-body {
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
