<template>
	<div class="p-12 w-full">
		<Header />
		<div class="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-6">
			<PlayerInformation />
			<PokemonCollection />
			<StoreStats />
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-6">
			<Raids class="col-span-2" />
			<MiscStats />
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from '../components/sections/header.vue';
import MiscStats from '../components/sections/misc-stats.vue';
import PlayerInformation from '../components/sections/player-information.vue';
import PokemonCollection from '../components/sections/pokemon-collection.vue';
import Raids from '../components/sections/raids.vue';
import StoreStats from '../components/sections/store-stats.vue';
</script>
