<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import type { PaginationObj } from '@/typings/jsonSpec.interfaces';

  interface PaginiationProps {
    pagination: PaginationObj;
  }

  const props = defineProps<PaginiationProps>();

  const emit = defineEmits<{
    (e: 'update', page: number): void;
  }>();

  const currentPage = ref<number>(1);
  const paginationState = ref<Array<number>>([]);
  const paginationLast = ref<number>(1);

  const isPrevControlActive = computed(() => props.pagination.current > 1);
  const isNextControlActive = computed(
    () => props.pagination.current < paginationLast.value,
  );

  const parsePagination = (): void => {
    const rangeSize = 1;
    paginationLast.value = props.pagination.last ? props.pagination.last : 1;

    const res = [];
    const minPaginationElems = 4 + rangeSize * 2;

    let rangeStart =
      paginationLast.value <= minPaginationElems
        ? 1
        : props.pagination.current - rangeSize;
    let rangeEnd =
      paginationLast.value <= minPaginationElems
        ? paginationLast.value
        : props.pagination.current + rangeSize;

    rangeEnd =
      rangeEnd > paginationLast.value ? paginationLast.value : rangeEnd;
    rangeStart = rangeStart < 1 ? 1 : rangeStart;

    if (paginationLast.value > minPaginationElems) {
      const isStartBoundaryReached = rangeStart - 1 < 3;
      const isEndBoundaryReached = paginationLast.value - rangeEnd < 3;

      if (isStartBoundaryReached) {
        rangeEnd = minPaginationElems - 2;

        for (let i = 1; i < rangeStart; i += 1) {
          res.push(i);
        }
      } else {
        res.push(1);
        res.push(0);
      }
      if (isEndBoundaryReached) {
        rangeStart = paginationLast.value - (minPaginationElems - 3);
        for (let i = rangeStart; i <= paginationLast.value; i += 1) {
          res.push(i);
        }
      } else {
        for (let i = rangeStart; i <= rangeEnd; i += 1) {
          res.push(i);
        }
        res.push(0);
        res.push(paginationLast.value);
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i += 1) {
        res.push(i);
      }
    }

    paginationState.value = res;
  };

  const clickHandler = (page: number): void => {
    currentPage.value = page;
    emit('update', currentPage.value);
  };

  const previousPage = (): void => {
    if (isPrevControlActive.value) {
      emit('update', props.pagination.current - 1);
    }
  };

  const nextPage = (): void => {
    if (isNextControlActive.value) {
      emit('update', props.pagination.current + 1);
    }
  };

  watch(
    () => props.pagination,
    () => {
      parsePagination();
    },
    { deep: true },
  );

  onMounted(() => {
    parsePagination();
  });
</script>

<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a
      v-if="isPrevControlActive"
      class="pagination-previous"
      @click="previousPage"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </a>

    <a v-if="isNextControlActive" class="pagination-next" @click="nextPage">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </a>

    <ul class="pagination-list">
      <li v-for="page in paginationState" :key="page">
        <a
          v-if="page !== 0"
          class="pagination-link"
          :class="{ 'is-current': page === pagination.current }"
          aria-label="`Goto page ${page}`"
          @click="clickHandler(page)"
        >
          {{ page }}
        </a>
        <span v-else class="pagination-ellipsis">&hellip;</span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  @import '@/styles/app.scss';

  a {
    background-color: white;
    margin: 0;
    padding: 0;
  }

  .pagination-previous,
  .pagination-next {
    margin: 2px;
    padding: 2px;
  }

  .pagination-link {
    margin: 2px;
    padding: 2px;
  }
</style>
