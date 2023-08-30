<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';

  interface PanelSearchProps {
    searchValue?: string;
  }

  const props = defineProps<PanelSearchProps>();

  const emit = defineEmits<{
    (e: 'searchUpdate', searchInput: string): void;
  }>();

  const searchInput = ref<string>('');

  const clearSearch = (): void => {
    searchInput.value = '';
    emit('searchUpdate', searchInput.value);
  };

  const searchConfirm = (): void => {
    emit('searchUpdate', searchInput.value);
  };

  let timeoutId: ReturnType<typeof setTimeout>;
  const searchDebounce = (): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => searchConfirm(), 500);
  };

  watch(searchInput, (search, prevSearch) => {
    if (!search && search !== prevSearch) {
      clearSearch();
    }
  });

  watch(
    () => props.searchValue,
    () => {
      searchInput.value = props.searchValue ?? '';
    },
  );

  onMounted(() => {
    searchInput.value = props.searchValue ?? '';
  });
</script>

<template>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input
        v-model="searchInput"
        class="input"
        type="search"
        placeholder="Search"
        @keyup="searchDebounce"
        @keyup.enter="searchConfirm"
      />
      <span class="icon is-left">
        <font-awesome-icon :icon="['fas', 'search']" />
      </span>
    </p>
  </div>
</template>
