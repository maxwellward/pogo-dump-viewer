<template>
	<p>Data page</p>
	<Purchases />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import Purchases from '../components/purchases.vue';

const dataStore = useDataStore();

const data = computed(() => dataStore.getData);
</script>
