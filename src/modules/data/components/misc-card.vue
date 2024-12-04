<template>
	<div :style="{ backgroundColor: '#F9F9F9' }" class="p-3 rounded-lg flex items-center">
		<component :is="icon" class="size-10 bg-red-300 p-2 rounded-md mr-2.5" />
		<div>
			<h2 class="text-sm text-primary font-semibold">{{ title }}</h2>
			<h3 class="text-xs text-secondary">{{ subtitle }}</h3>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, type Component } from 'vue';

defineProps<{
	icon: Component;
	title: string;
	subtitle: string;
}>();
</script>
