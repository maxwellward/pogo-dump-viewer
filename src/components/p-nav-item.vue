<template>
	<div>
		<router-link :to="to" :class="isActive ? 'text-active font-bold' : 'text-inactive'" class="flex items-center gap-3.5">
			<component :is="icon" class="size-6" />
			<a class="text-lg">{{ text }}</a>
		</router-link>
	</div>
</template>

<script setup lang="ts">
import { type Component, defineProps } from 'vue';

defineProps<{
	icon: Component;
	to: string;
	text: string;
	isActive: boolean;
}>();
</script>
