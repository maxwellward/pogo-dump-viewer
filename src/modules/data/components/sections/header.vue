<template>
	<div class="flex w-full justify-between">
		<div v-if="playerInfo">
			<h1 class="font-bold text-2xl">{{ playerInfo.username }}</h1>
			<h2 class="text-xs text-inactive">& {{ playerInfo.buddyNickname }}</h2>
			<h3 class="text-sm font-medium text-inactive mt-2">Level {{ playerInfo.level }} ({{ playerInfo.totalXP }} XP)</h3>
			<h3 class="text-sm font-medium text-inactive">Player since {{ playerInfo.startDate }}</h3>
		</div>
		<div class="flex h-fit items-center gap-3">
			<a href="https://google.com" target="_blank" class="hover:cursor-pointer hover:underline decoration-dotted flex items-center gap-1">
				<BugAntIcon class="size-5" />
				<span class="font-semibold text-sm">Report an issue</span>
			</a>
			<Logo />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Logo from '../../../../assets/logo.vue';
import { BugAntIcon } from '@heroicons/vue/24/outline';
import { getDataFromDb } from '../../../../helpers/indexedDb';
import { Gameplay } from '../../types';

const playerInfo = ref();

onMounted(async () => {
	const data: Gameplay = await getDataFromDb('gameplay');
	playerInfo.value = data.playerInfo;
});
</script>
