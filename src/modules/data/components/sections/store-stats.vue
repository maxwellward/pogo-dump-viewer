<template>
	<div class="flex flex-col gap-2">
		<!-- TODO: Add disclaimer mentioning the $30 average spend yearly -->
		<StoreCard
			colour="#FFF0E6"
			:title="`$${totalSpend} USD`"
			subtitle="Spent in Store"
			:description="`${percentageOfAverage}% ${percentageOfAverage > 0 ? 'Higher' : 'Lower'} than Average`" />
		<StoreCard colour="#ECEAFE" title="$468" subtitle="Spent in Store" description="24% Higher than Average" />
		<StoreCard colour="#E5F7FF" title="$468" subtitle="Spent in Store" description="24% Higher than Average" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import StoreCard from '../store-card.vue';
import { getDataFromDb } from '../../../../helpers/indexedDb';

onMounted(async () => {
	await getMoneySpent();
});

// TODO: Merge these all into one so I don't have to loop through the JSON multiple times
// TODO: Make this use any currency

const totalSpend = ref(0);
const yearsPlayed = ref(1);
const percentageOfAverage = ref(0);
const getMoneySpent = async () => {
	const { data } = await getDataFromDb('InAppPurchases');
	const playerData = await getDataFromDb('gameplay');

	const startDateUnparsed = new Date(playerData.playerInfo.startDate);

	const yearsPlayedUnverified = new Date().getFullYear() - startDateUnparsed.getFullYear();
	yearsPlayed.value = yearsPlayedUnverified > 0 ? yearsPlayedUnverified : 1;

	totalSpend.value = data
		.reduce((acc: number, purchase: any) => {
			if (purchase['Currency'] === 'USD') {
				acc += Number(purchase['Money spent on purchase']);
			}
			return acc;
		}, 0)
		.toFixed(2);

	calculateSpendPercentage();
};

const calculateSpendPercentage = () => {
	const averageSpend = yearsPlayed.value * 30;
	console.log(totalSpend.value, averageSpend);

	const percentage = ((totalSpend.value / averageSpend) * 100).toFixed(0);
	percentageOfAverage.value = Number(percentage);
};
</script>
