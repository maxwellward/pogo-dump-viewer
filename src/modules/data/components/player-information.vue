<template>
	<p-card>
		<template #top>
			<h1>Player Information</h1>
		</template>
		<template #body>
			<div class="flex flex-wrap gap-4">
				<div v-for="(info, index) in playerInfoList" :key="index">
					<div class="flex items-center gap-2">
						<p-dot />
						<p class="text-sm text-secondary">{{ info.label }}</p>
					</div>
					<p class="font-bold text-lg">
						{{
							Math.round(info.value)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}
						{{ info.suffix }}
					</p>
				</div>
			</div>
		</template>
	</p-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '../store';

const dataStore = useDataStore();

const playerInfoList = ref([
	{ label: 'Stardust Balance', value: dataStore.getPlayerInfo.stardust },
	{ label: 'Items in Bag', value: dataStore.getItemCount },
	{ label: 'Pokecoin Balance', value: dataStore.getPlayerInfo.pokecoins },
	{ label: 'Distance Walked', value: dataStore.getPlayerInfo.distanceWalked, suffix: 'km' },
	{ label: 'Eggs Hatched', value: dataStore.getEggsHatched },
]);
</script>
