<template>
	<div class="relative rounded-full overflow-hidden animate-spin shadow-lg" :style="{ width: size, height: size }">
		<div class="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>
		<div class="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
		<div
			class="absolute top-1/2 left-1/2 bg-white border-black rounded-full z-20"
			:style="{ width: centerSize, height: centerSize, borderWidth: borderSize, transform: 'translate(-50%, -50%)' }"></div>
		<div class="absolute top-1/2 left-0 w-full bg-black z-10" :style="{ height: lineSize, transform: 'translateY(-50%)' }"></div>
	</div>
</template>

<script>
export default {
	name: 'PSpinner',
	props: {
		size: {
			type: String,
			default: '32px',
		},
	},
	computed: {
		centerSize() {
			return `calc(${this.size} / 4)`;
		},
		borderSize() {
			return `calc(${this.size} / 24)`;
		},
		lineSize() {
			return `calc(${this.size} / 24)`;
		},
	},
};
</script>

<style scoped>
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.animate-spin {
	animation: spin 2s ease-in-out infinite;
}
</style>
