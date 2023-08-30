<script setup lang="ts">
  import type { PanelButton } from '@/typings/form.interfaces';


  interface PanelNavHeaderProps {
    navButtons: PanelButton[];
  }

  const props = defineProps<PanelNavHeaderProps>();

  const emit = defineEmits<{
    (e: 'navButtonClick', button: PanelButton): void;
  }>();

  const navButtonClick = (button: PanelButton): void => {
    emit('navButtonClick', button);
  };
</script>

<template>
  <div id="PanelNavHeader">
    <nav class="navbar" role="navigation" aria-label="sub navigation">
      <div class="navbar-menu">
        <div
          v-for="(navButton, index) in navButtons"
          :key="index"
          class="navbar-item-wrapper"
        >
          <a
            class="navbar-item"
            :data-test="navButton.dataTest"
            @click="navButtonClick(navButton)"
          >
            {{ navButton.label }}
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  #PanelNavHeader {
    .navbar {
      min-height: 30px;
      .navbar-menu {
        padding-left: 12px;
        .navbar-item-wrapper {
          a {
            &.navbar-item {
              padding-top: 1px;
              padding-bottom: 0;
              padding-left: 8px;
              padding-right: 8px;
              font-weight: $weight-regular;
            }
          }
          a:hover {
            &.navbar-item {
              font-weight: $weight-black;
            }
          }
        }
      }
    }
  }
</style>
