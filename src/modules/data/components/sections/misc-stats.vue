<template>
	<div class="flex flex-col gap-2">
		<MiscCard :icon="StarIcon" title="Encountered" subtitle="So many pokemen" />
		<MiscCard :icon="StarIcon" title="Encountered" subtitle="So many pokemen" />
		<MiscCard :icon="StarIcon" title="Encountered" subtitle="So many pokemen" />
		<MiscCard :icon="StarIcon" title="Encountered" subtitle="So many pokemen" />
		<MiscCard :icon="StarIcon" title="Encountered" subtitle="So many pokemen" />
		<MiscCard :icon="StarIcon" title="Encountered" subtitle="So many pokemen" />
	</div>
</template>

<script setup lang="ts">
import MiscCard from '../misc-card.vue';
import { StarIcon } from '@heroicons/vue/20/solid';
</script>
