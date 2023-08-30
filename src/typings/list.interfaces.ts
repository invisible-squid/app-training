import type { ResourceObject } from '@/typings/jsonSpec.interfaces';
import { TableCellStyle, TableCellType } from '@/enums/list.enums';

interface ListItem {
  id: string;
  type: string;
  title?: string;
  label: string;
  dataTest?: string;
}

interface TableCellItem {
  data?: string | boolean;
  label: string;
  type?: TableCellType;
  style?: TableCellStyle;
}

interface TableRowConfig {
  canClick: boolean;
  canDelete: boolean;
}

interface TableRowItem {
  id: string;
  type: string;
  rowConfig: TableRowConfig;
  cells: TableCellItem[];
  resourceObj: ResourceObject;
}

interface TableHeaderItem {
  label: string;
}

interface AllowedConfig {
  canClick: boolean;
  canDelete: boolean;
}

interface TableConfig {
  hasActions: boolean;
  hasInputs?: boolean;
}

interface TableList {
  config: TableConfig;
  headers: TableHeaderItem[];
  rows: TableRowItem[];
}

interface TableMethodsRedux {
  headers: TableHeaderItem[];
  rowConfig: TableRowConfig;
  tableConfig: TableConfig;
  cellsFor(object: ResourceObject): TableCellItem[];
  rowsFor(objects: ResourceObject[], selectedIds?: string[]): TableRowItem[];
  getTable(
    objects: ResourceObject[],
    selectedIds?: string[],
    rowConfig?: TableRowConfig,
  ): TableList;
}

interface RowItemInput {
  row: TableRowItem;
  input: number | string;
}

export {
  ListItem,
  TableCellItem,
  AllowedConfig,
  TableConfig,
  TableHeaderItem,
  TableList,
  TableRowConfig,
  TableRowItem,
  TableMethodsRedux,
  RowItemInput,
};
