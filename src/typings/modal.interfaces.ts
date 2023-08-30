import { ButtonAction, ButtonStyle } from '@/enums/modal.enums';
import { NavigationObj } from './jsonSpec.interfaces';
import type { SelectOptions } from './form.interfaces';
import { AlertType } from '@/enums/jsonSpec.enums';

interface AlertMessageObj {
  title: string;
  message: string;
  messageType: string;
  alertType?: AlertType;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputHelper?: string;
  payload: AlertPayload;
}

interface AlertPayload {
  entityAction: string;
  entityType: string;
  entityId: string;
  payloadInput?: string;
}

interface InfoModalObj {
  title: string;
  name: string;
  infoArray: SelectOptions[];
}

interface LoadingModalObj {
  title: string;
  message: string;
}

interface MessageObj {
  title: string;
  message: string;
  type: string;
  payload?: NavigationObj;
}

interface ModalButton {
  label: string;
  data?: string;
  action?: ButtonAction;
  style?: ButtonStyle;
}

export {
  AlertMessageObj,
  AlertPayload,
  InfoModalObj,
  LoadingModalObj,
  MessageObj,
  ModalButton,
};
