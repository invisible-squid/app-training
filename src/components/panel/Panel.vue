<script setup lang="ts">
  // COMPONENTS
  import Pagination from '@/components/pagination/Pagination.vue';
  import PanelTable from '@/components/panel/PanelTable.vue';
  import PanelHeader from '@/components/panel/PanelHeader.vue';
  import PanelFooter from '@/components/panel/PanelFooter.vue';

  // TYPES
  import type {
    AllowedConfig,
    ListItem,
    TableCellItem,
    TableHeaderItem,
    TableList,
    TableRowItem,
  } from '@/typings/list.interfaces';
  import type { PanelButton, SelectOptions } from '@/typings/form.interfaces';
  import type {
    PaginationObj,
  } from '@/typings/jsonSpec.interfaces';

  interface PanelProps {
    panelFooterButtons?: PanelButton[];
    panelHeaderButtons?: PanelButton[];
    panelFilters?: SelectOptions[];
    hasSearch?: boolean;
    searchValue?: string;
    listItems?: ListItem[];
    allowedConfig?: AllowedConfig;
    allowTableActions?: boolean;
    tableListItems?: TableList;
    pagination?: PaginationObj;
    selectedId?: string;
    tabListItems?: ListItem[];
    currentTab?: string;
    title: string;
  }

  const props = withDefaults(defineProps<PanelProps>(), {
    allowTableActions: true,
    selectedId: '',
  });

  const emit = defineEmits<{
    (e: 'cellClick', cell: TableCellItem, row: TableRowItem): void;
    (e: 'headerClick', header: TableHeaderItem): void;
    (e: 'pageSelected', pageSelected: number): void;
    (e: 'panelButtonClick', button: PanelButton): void;
    (e: 'viewClick', row: TableRowItem): void;
    (e: 'tabItemSelected', tabItem: ListItem): void;
  }>();

  const pageUpdated = (pageSelected: number): void => {
    emit('pageSelected', pageSelected);
  };

  const panelButtonClick = (button: PanelButton): void => {
    emit('panelButtonClick', button);
  };

  const tabItemSelected = (tabItem: ListItem): void => {
    emit('tabItemSelected', tabItem);
  };

  const headerClick = (header: TableHeaderItem): void => {
    emit('headerClick', header);
  };

  const cellClick = (cell: TableCellItem, row: TableRowItem): void => {
    emit('cellClick', cell, row);
  };

  const viewClick = (row: TableRowItem): void => {
    emit('viewClick', row);
  };

  const tableListHasRows = (): boolean => {
    if (
      props.tableListItems &&
      props.tableListItems.rows &&
      props.tableListItems.rows.length
    ) {
      return true;
    }

    return false;
  };
</script>

<template>
  <div id="Panel">
    <nav class="panel is-info">
      <p class="panel-heading">
        {{ title }}
      </p>

      <PanelHeader
        v-if="panelHeaderButtons"
        :panelHeaderButtons="panelHeaderButtons"
        @panelButtonClick="panelButtonClick"
      />

      <p v-if="tabListItems && currentTab" class="panel-tabs">
        <span v-for="(tabItem, index) in tabListItems" :key="index">
          <a
            :class="{ 'is-active': tabItem.type === currentTab }"
            :data-list="tabItem.dataTest"
            @click="tabItemSelected(tabItem)"
            >{{ tabItem.label }}</a
          >
        </span>
      </p>

      <PanelTable
        v-if="tableListItems && tableListHasRows()"
        :allowTableActions="allowTableActions"
        :allowedConfig="allowedConfig"
        :tableListItems="tableListItems"
        @cellClick="cellClick"
        @headerClick="headerClick"
        @viewClick="viewClick"
      />

      <PanelFooter
        :panelFooterButtons="panelFooterButtons"
        @panelButtonClick="panelButtonClick"
      />
    </nav>

    <div v-if="pagination && pagination.last && pagination.last > 1">
      <Pagination :pagination="pagination" @update="pageUpdated" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  .panel-footer {
    background-color: $very-light-blue-gray;
  }

  .panel-tabs {
    margin-bottom: -1px;
    span {
      padding: 2px;
      a.is-active {
        padding: 2px;
        color: $blue;
        font-weight: $weight-semibold;
        border-bottom-width: 2px;
        border-bottom-color: $blue;
      }
    }
  }

  // Override `is-success` formatting of the tabs
  .panel {
    &.is-success {
      .panel-tabs {
        a.is-active {
          border-bottom-color: $blue;
        }
      }
    }
  }
</style>
