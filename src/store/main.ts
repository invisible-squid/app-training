import { defineStore } from 'pinia';
import type {
  AlertMessageObj,
  InfoModalObj,
  MessageObj,
} from '@/typings/modal.interfaces';
import type { TestFormData } from '@/typings/form.interfaces';

interface MainStoreState {
  alertMessageObj: AlertMessageObj | undefined;
  infoModalObj: InfoModalObj | undefined;
  messageObj: MessageObj | undefined;
  isAlertModalActive: boolean;
  isInfoModalActive: boolean;
  isMessageActive: boolean;
  testFormData: TestFormData | undefined;
}

export const useMainStore = defineStore('main', {
  state: (): MainStoreState => ({
    alertMessageObj: undefined,
    infoModalObj: undefined,
    messageObj: undefined,
    isAlertModalActive: false,
    isInfoModalActive: false,
    isMessageActive: false,
    testFormData: undefined,
  }),
  actions: {
    setAlertMessageObj(val: AlertMessageObj): void {
      this.alertMessageObj = val;
    },
    setInfoModalObj(val: InfoModalObj): void {
      this.infoModalObj = val;
    },
    setMessageObj(val: MessageObj): void {
      this.messageObj = val;
    },
    setTestFormData(val: TestFormData): void {
    },
    setIsAlertModalActive(val: boolean): void {
      this.isAlertModalActive = val;
    },
    setIsInfoModalActive(val: boolean): void {
      this.isInfoModalActive = val;
    },
    setIsMessageActive(val: boolean): void {
      this.isMessageActive = val;
    },
  },
});
