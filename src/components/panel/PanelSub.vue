<script setup lang="ts">
  // COMPONENTS
  import Panel from '@/components/panel/Panel.vue';

  // TYPES
  import type {
    AllowedConfig,
    ListItem,
    TableCellItem,
    TableHeaderItem,
    TableList,
    TableRowItem,
  } from '@/typings/list.interfaces';
  import type { PaginationObj } from '@/typings/jsonSpec.interfaces';
  import type { PanelButton, SelectOptions } from '@/typings/form.interfaces';

  interface HomeSubProps {
    allowedConfig?: AllowedConfig;
    allowTableActions?: boolean;
    currentTab: string;
    panelPagination?: PaginationObj;
    panelTableItems: TableList;
    panelTitle?: string;
    panelFooterButtons?: PanelButton[];
    panelHeaderButtons?: PanelButton[];
    panelFilters?: SelectOptions[];
    panelTabList: ListItem[];
  }

  const props = withDefaults(defineProps<HomeSubProps>(), {
    allowTableActions: true,
    panelTitle: '',
  });

  const emit = defineEmits<{
    (e: 'headerClick', header: TableHeaderItem): void;
    (e: 'lifeCycleClick', row: TableRowItem): void;
    (e: 'mapClick', row: TableRowItem): void;
    (e: 'pageSelected', page: number): void;
    (e: 'panelButtonClick', button: PanelButton): void;
    (e: 'tabSelected', tabItem: ListItem): void;
    (e: 'tableCellSelected', cell: TableCellItem, row: TableRowItem): void;
    (e: 'toggleClick', row: TableRowItem): void;
  }>();

  const headerClick = (header: TableHeaderItem): void => {
    emit('headerClick', header);
  };

  const lifeCycleClick = (row: TableRowItem): void => {
    emit('lifeCycleClick', row);
  };

  const mapClick = (row: TableRowItem): void => {
    emit('mapClick', row);
  };

  const pageSelected = (page: number): void => {
    emit('pageSelected', page);
  };

  const panelButtonClick = (button: PanelButton): void => {
    emit('panelButtonClick', button);
  };

  const tableCellSelected = (cell: TableCellItem, row: TableRowItem): void => {
    emit('tableCellSelected', cell, row);
  };

  const tabItemSelected = (tabItem: ListItem): void => {
    emit('tabSelected', tabItem);
  };

  const toggleClick = (row: TableRowItem): void => {
    emit('toggleClick', row);
  };
</script>

<template>
  <Panel
    :allowedConfig="allowedConfig"
    :allowTableActions="allowTableActions"
    :currentTab="currentTab"
    :pagination="panelPagination"
    :panelFooterButtons="panelFooterButtons"
    :tableListItems="panelTableItems"
    :tabListItems="panelTabList"
    :title="panelTitle"
    @cellClick="tableCellSelected"
    @headerClick="headerClick"
    @lifeCycleClick="lifeCycleClick"
    @mapClick="mapClick"
    @pageSelected="pageSelected"
    @panelButtonClick="panelButtonClick"
    @tabItemSelected="tabItemSelected"
    @toggleClick="toggleClick"
  />
</template>
