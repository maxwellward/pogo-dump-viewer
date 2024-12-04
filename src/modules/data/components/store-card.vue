<template>
	<div :style="{ backgroundColor: colour }" class="space-y-1 p-3.5 text-center rounded-lg h-full">
		<h1 class="text-2xl font-bold text-primary">{{ title }}</h1>
		<h2 class="text-sm text-primary">{{ subtitle }}</h2>
		<h3 class="text-xs text-secondary">{{ description }}</h3>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
	colour: string;
	title: string;
	subtitle: string;
	description: string;
}>();

const { colour } = props;
</script>
