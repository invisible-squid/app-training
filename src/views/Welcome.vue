<script setup lang="ts">
  import { ref } from 'vue';
  import TestModal from '@/components/TestModal.vue';
  import Panel from '@/components/panel/Panel.vue';
  import type {
    PanelButton,
    SelectOptions,
    TestFormData,
  } from '@/typings/form.interfaces';
  import type { ListItem } from '@/typings/list.interfaces';
  import { useMainStore } from '@/store/main';
  import { MessageObj } from '@/typings/modal.interfaces';

  const mainStore = useMainStore();
  const isModalOpen = ref<boolean>(false);

  const panelFooterButtons = ref<PanelButton[]>([
    {
      label: 'Open Test Form',
      action: 'openTestForm',
      dataTest: 'openTestFormBtn',
    },
  ]);

  const selectOptions: SelectOptions[] = [
    {
      data: '',
      label: 'Select an option',
    },
    {
      data: '1',
      label: 'Option 1',
    },
    {
      data: '2',
      label: 'Option 2',
    },
    {
      data: '3',
      label: 'Option 3',
    },
  ];
  const radioOptions: SelectOptions[] = [
    {
      data: true,
      label: 'Option 1',
    },
    {
      data: false,
      label: 'Option 2',
    },
  ];

  const tabListItems = ref<ListItem[]>([
    {
      id: '1',
      type: 'tab1',
      label: 'Tab item 1',
    },
    {
      id: '2',
      type: 'tab2',
      label: 'Tab item 2',
    },
    {
      id: '3',
      type: 'tab3',
      label: 'Tab item 3',
    },
  ]);

  const currentTab = ref<string>(tabListItems.value[0].type);

  const handleButtonClick = (btn: PanelButton): void => {
    switch (btn.action) {
      case 'openTestForm':
        openModalClick();
        break;
      default:
      // unknown action
    }
  };

  const tabItemSelected = (tabSelected: ListItem): void => {
    currentTab.value = tabSelected.type;
  };

  const openModalClick = (): void => {
    isModalOpen.value = true;
  };
  const closeModalClick = (): void => {
    isModalOpen.value = false;
  };

  const formDataExported = (testFormData: TestFormData): void => {
    mainStore.setTestFormData(testFormData);
    const message: MessageObj = {
      title: 'Test Message',
      message: 'Test Form Data was emitted',
      type: 'success',
    };
    mainStore.setMessageObj(message);
    mainStore.setIsMessageActive(true);
    closeModalClick();
  };
</script>
<template>
  <TestModal
    :show="isModalOpen"
    :radioOptions="radioOptions"
    :selectOptions="selectOptions"
    @dismiss="closeModalClick"
    @exportFormData="formDataExported"
  />
  <div id="Welcome" class="container is-fluid">
    <section class="section">
      <Panel
        :title="'Testing features'"
        :panelFooterButtons="panelFooterButtons"
        :currentTab="currentTab"
        :tabListItems="tabListItems"
        @panelButtonClick="handleButtonClick"
        @tabItemSelected="tabItemSelected"
      />
    </section>
  </div>
</template>
<style lang="scss">
  @import '@/styles/app.scss';
  .container {
    margin-top: 30px !important;
  }
</style>
