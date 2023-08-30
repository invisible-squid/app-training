<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { SelectOptions } from '@/typings/form.interfaces';
  import FormSelect from '@/components/form/FormSelect.vue';

  interface PanelFilterProps {
    panelFilters: SelectOptions[];
  }

  const props = defineProps<PanelFilterProps>();

  const emit = defineEmits<{
    (e: 'filterSelected', filterSelected: string): void;
  }>();

  const filterSelected = ref<string>('');

  watch(
    () => filterSelected.value,
    () => {
      emit('filterSelected', filterSelected.value);
    },
  );
</script>

<template>
  <div id="PanelFilter">
    <FormSelect
      v-model="filterSelected"
      :isSmall="true"
      :selectOptions="panelFilters"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';
  #PanelFilter {
    margin-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
