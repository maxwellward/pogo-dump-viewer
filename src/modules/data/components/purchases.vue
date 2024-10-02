<template>
	<p-card>
		<template #top>
			<h1>Purchases</h1>
		</template>
		<template #content>
			<p>{{ totalSpent.toFixed(2) }}</p>
		</template>
	</p-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const dataStore = useDataStore();

const purchases = computed(() => dataStore.getData);

const realMoneyPurchases = computed(() => {
	console.log(purchases.value.filter((purchase) => purchase['Currency'] === 'USD'));

	return purchases.value.filter((purchase) => purchase['Currency'] === 'USD');
});

const totalSpent = computed(() => {
	return realMoneyPurchases.value.reduce((acc, purchase) => Number(acc) + Number(purchase['Money spent on purchase']), 0);
});
</script>
