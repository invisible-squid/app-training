<script setup lang="ts">
  import type {
    AllowedConfig,
    RowItemInput,
    TableCellItem,
    TableHeaderItem,
    TableList,
    TableRowConfig,
    TableRowItem,
  } from '@/typings/list.interfaces';
  import { ref } from 'vue';
  import PanelTableCell from '@/components/panel/PanelTableCell.vue';

  interface PanelTableProps {
    allowedConfig?: AllowedConfig;
    allowTableActions?: boolean;
    tableListItems: TableList;
  }

  const props = withDefaults(defineProps<PanelTableProps>(), {
    allowTableActions: true,
  });

  const emit = defineEmits<{
    (e: 'cellClick', cell: TableCellItem, row: TableRowItem): void;
    (e: 'headerClick', header: TableHeaderItem): void;
    (e: 'deleteClick', row: TableRowItem): void;
  }>();

  const cellClick = (cell: TableCellItem, row: TableRowItem): void => {
    emit('cellClick', cell, row);
  };

  const headerClick = (header: TableHeaderItem): void => {
    emit('headerClick', header);
  };

  const deleteClick = (row: TableRowItem): void => {
    emit('deleteClick', row);
  };

  const actionsAllowed = (): boolean => {
    let allowed = false;

    if (props.allowTableActions) {
      if (props.allowedConfig) {
        allowed = true;
      }

      if (props.tableListItems.config.hasActions) {
        allowed = true;
      }
    }

    return allowed;
  };

  const canShowAction = (action: string, row: TableRowItem): boolean => {
    let actionOverridden = false;
    let allowedForRow = false;

    const tableRowKeys: Array<keyof TableRowConfig> = Object.keys(
      row.rowConfig,
    ).map((key) => key as keyof TableRowConfig);

    allowedForRow =
      tableRowKeys.filter((key) => {
        if (key === action) {
          if (row.rowConfig[key]) {
            return true;
          }
        }
        return false;
      }).length > 0;

    if (props.allowedConfig) {
      const allowedConfigKeys: Array<keyof AllowedConfig> = Object.keys(
        props.allowedConfig,
      ).map((key) => key as keyof AllowedConfig);

      actionOverridden =
        allowedConfigKeys.filter((key) => {
          if (props.allowedConfig) {
            if (key === action) {
              if (!props.allowedConfig[key]) {
                return true;
              }
            }
          }
          return false;
        }).length > 0;
    }

    return allowedForRow && !actionOverridden;
  };
</script>

<template>
  <div id="PanelTable">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th
            v-for="(header, index) in tableListItems.headers"
            :key="index"
            @click="headerClick(header)"
          >
            {{ header.label }}
          </th>
          <th v-if="actionsAllowed()">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- ROWS -->
        <tr v-for="row in tableListItems.rows" :key="row.id">
          <!-- CELLS -->
          <PanelTableCell
            v-for="(cell, index) in row.cells"
            :key="index"
            :cell="cell"
            :row="row"
            @cellClick="cellClick"
          />

          <!-- ACTIONS -->
          <td v-if="actionsAllowed()">
            <div class="table-actions">
              <button
                v-if="canShowAction('canDelete', row)"
                class="button is-danger"
                @click="deleteClick(row)"
              >
                <font-awesome-icon :icon="['fas', 'trash-alt']" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  .table {
    margin-top: 2px;

    tr {
      cursor: pointer;
    }
  }

  #PanelTable {
    display: flex;
  }

  .table-actions {
    white-space: nowrap;

    button {
      margin: 0px;
      margin-left: 5px;
      margin-right: 5px;
      padding: 0;
      padding-right: 8px;
      padding-left: 8px;
      width: 30px;
      height: 30px;
    }
  }
</style>
