<template>
	<div class="flex flex-col gap-2">
		<!-- TODO: Add disclaimer mentioning the $30 average spend yearly -->
		<StoreCard
			colour="#FFF0E6"
			:title="`$${totalSpend} USD`"
			subtitle="Spent in Store"
			:description="`${percentageOfAverage}% ${percentageOfAverage > 0 ? 'Higher' : 'Lower'} than Average`" />
		<StoreCard
			colour="#ECEAFE"
			:title="`${totalCoinSpend.toLocaleString()} Pokecoins`"
			subtitle="Spent in Store"
			:description="`Over ${totalCoinTransactions.toLocaleString()} different transactions`" />
		<StoreCard
			colour="#E5F7FF"
			:title="`${totalFriends}`"
			subtitle="Friends"
			:description="`You invited ${friendsInvited}, and ${friendsInvitedYou} invited you`" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import StoreCard from '../store-card.vue';
import { getDataFromDb } from '../../../../helpers/indexedDb';

onMounted(async () => {
	await getMoneySpent();
	await getPokecoinsSpent();
	await getFriendCount();
});

// TODO: Merge these all into one so I don't have to loop through the JSON multiple times
// TODO: Make this use any currency
const totalFriends = ref(0);
const friendsInvited = ref(0);
const friendsInvitedYou = ref(0);

const totalCoinSpend = ref(0);
const totalCoinTransactions = ref(0);

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
	const percentage = ((totalSpend.value / averageSpend) * 100).toFixed(0);
	percentageOfAverage.value = Number(percentage);
};
// Change in pokecoins
const getPokecoinsSpent = async () => {
	const { data } = await getDataFromDb('InAppPurchases');

	totalCoinSpend.value = data
		.reduce((acc: number, purchase: any) => {
			if (purchase['Change in pokecoins']) {
				acc += Math.abs(Number(purchase['Change in pokecoins']));
				totalCoinTransactions.value++;
			}
			return acc;
		}, 0)
		.toFixed(0);
};

const getFriendCount = async () => {
	const { data } = await getDataFromDb('FriendList');

	data.forEach((friend) => {
		totalFriends.value++;
		if (friend['Friendship initiated by'] === 'You') {
			friendsInvited.value++;
		} else {
			friendsInvitedYou.value++;
		}
	});
};
</script>
