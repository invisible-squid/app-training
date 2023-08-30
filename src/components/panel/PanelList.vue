<script setup lang="ts">
  import { ref } from 'vue';
  import AttachmentItem from '@/components/attachment/AttachmentItem.vue';
  import type { ListItem } from '@/typings/list.interfaces';

  interface PanelListProps {
    listItems: ListItem[];
    selectedId?: string;
  }

  const props = withDefaults(defineProps<PanelListProps>(), {
    selectedId: '',
  });

  const emit = defineEmits<{
    (e: 'itemSelected', item: ListItem): void;
  }>();

  const listItemSelected = ref<string>('');

  const itemSelected = (item: ListItem): void => {
    emit('itemSelected', item);
  };
</script>

<template>
  <a
    v-for="(item, index) in listItems"
    :key="index"
    class="panel-block"
    :class="{ selected: selectedId === item.id }"
    @click="itemSelected(item)"
  >
    <span v-if="selectedId === item.id" class="panel-icon fa-xs">
      <font-awesome-icon :icon="['fas', 'check']" />
    </span>
    <span v-else class="panel-icon">
      <i class="fas fa-check"></i>
    </span>
    <strong v-if="item.title" v-html="item.title"></strong>&nbsp;
    <span v-html="item.label"></span>
  </a>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  .panel-block {
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 14px;
    &.is-active {
      color: $green;
    }
    &.selected {
      color: $green;
      font-weight: $weight-bold;
    }
  }
</style>
