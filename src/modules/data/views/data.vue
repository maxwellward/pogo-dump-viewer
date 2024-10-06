<template>
	<div class="p-12 w-full">
		<Header />
		<div class="grid grid-cols-3 mt-4">
			<PlayerInformation />
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from '../components/header.vue';
import PlayerInformation from '../components/player-information.vue';
</script>
