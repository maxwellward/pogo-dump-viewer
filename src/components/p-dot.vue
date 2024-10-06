<template>
	<div class="size-3 rounded-full" :style="{ backgroundColor: randomColor }" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const randomColor = computed(() => {
	let color;
	do {
		const randomHex = Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0');
		color = `#${randomHex}80`;
	} while (isTooLight(color));
	return color;
});

function isTooLight(color: string): boolean {
	const r = parseInt(color.slice(1, 3), 16);
	const g = parseInt(color.slice(3, 5), 16);
	const b = parseInt(color.slice(5, 7), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 200;
}
</script>
