interface SelectObj {
  name: string;
  value: string;
}

interface SelectOptions {
  label: string;
  data: boolean | string | number | undefined;
}

interface PanelButton {
  label: string;
  action: string;
  style?: string;
  dataTest: string;
}

interface TestFormData {
  input: string;
  radio: boolean;
  select: string;
  text: string;
}

enum FormMode {
  Add,
  Edit,
  View,
}

export { FormMode, PanelButton, SelectObj, SelectOptions, TestFormData };
