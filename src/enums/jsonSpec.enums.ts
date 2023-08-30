enum ActionType {
  Add = 'add',
  Complete = 'complete',
  Cancel = 'cancel',
  Delete = 'delete',
  Invoice = 'invoice',
  Save = 'save',
  Select = 'select',
  Suspend = 'suspend',
  Update = 'update',
  View = 'view',
}

enum AlertType {
  Confirm = 'confirm',
  Input = 'input',
  Notice = 'notice',
}

enum SortingDirection {
  asc = 'asc',
  desc = 'desc',
}

export { ActionType, AlertType, SortingDirection };
