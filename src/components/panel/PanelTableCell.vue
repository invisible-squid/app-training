<script setup lang="ts">
  import { ref } from 'vue';
  import type { TableCellItem, TableRowItem } from '@/typings/list.interfaces';

  interface PanelTableCellProps {
    cell: TableCellItem;
    row: TableRowItem;
  }

  const props = defineProps<PanelTableCellProps>();

  const emit = defineEmits<{
    (e: 'cellClick', cell: TableCellItem, row: TableRowItem): void;
  }>();

  const isToggled = ref<boolean>(false);

  const cellClick = (cell: TableCellItem, row: TableRowItem): void => {
    emit('cellClick', cell, row);
  };

  const toggleClick = (cell: TableCellItem, row: TableRowItem): void => {
    if (isToggled.value) {
      isToggled.value = false;
    } else {
      isToggled.value = true;
    }
    cellClick(cell, row);
  };
</script>

<template>
  <!-- TEXT CELL -->
  <td
    v-if="cell.type !== 'toggle'"
    @click="cellClick(cell, row)"
    v-html="cell.label"
  ></td>

  <!-- TOGGLE CELL-->
  <td
    v-if="cell.type === 'toggle'"
    class="toggle-icon"
    @click="toggleClick(cell, row)"
  >
    <span v-if="cell.data">
      <font-awesome-icon v-if="!isToggled" :icon="['far', 'square']" />

      <font-awesome-icon v-if="isToggled" :icon="['fas', 'square-check']" />
    </span>
  </td>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  .toggle-icon {
    color: $blue;
  }
</style>
