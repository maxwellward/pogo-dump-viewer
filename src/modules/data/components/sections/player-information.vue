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
import { onMounted, ref } from 'vue';
import { getDataFromDb } from '../../../../helpers/indexedDb';
import { Gameplay } from '../../types';

let playerInfoList = ref();
let data: Gameplay;
onMounted(async () => {
	data = await getDataFromDb('gameplay');

	playerInfoList.value = [
		{ label: 'Stardust Balance', value: data.playerInfo.stardust },
		{ label: 'Items in Bag', value: data.itemCount },
		{ label: 'Pokecoin Balance', value: data.playerInfo.pokecoins },
		{ label: 'Distance Walked', value: data.playerInfo.distanceWalked, suffix: 'km' },
		{ label: 'Eggs Hatched', value: data.eggsHatched },
	];
});
</script>
