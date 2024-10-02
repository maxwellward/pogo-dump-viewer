<template>
	<p>Data page</p>
	{{ data }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const dataStore = useDataStore();

const data = computed(() => dataStore.getData);
</script>
