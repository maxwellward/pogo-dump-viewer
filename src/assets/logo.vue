<template>
	<svg
		role="button"
		width="48"
		height="48"
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="hover:scale-105 hover:rotate-90 transform duration-500 ease-in-out"
		@click="navigateHome">
		<path
			d="M37.88 10.84L27.54 4.86C25.56 3.72 22.46 3.72 20.48 4.86L10.04 10.88C5.89997 13.68 5.65997 14.1 5.65997 18.56V29.42C5.65997 33.88 5.89997 34.32 10.12 37.16L20.46 43.14C21.46 43.72 22.74 44 24 44C25.26 44 26.54 43.72 27.52 43.14L37.96 37.12C42.1 34.32 42.34 33.9 42.34 29.44V18.56C42.34 14.1 42.1 13.68 37.88 10.84Z"
			fill="#F6866A" />
		<path
			d="M24 30.5C27.5899 30.5 30.5 27.5899 30.5 24C30.5 20.4101 27.5899 17.5 24 17.5C20.4101 17.5 17.5 20.4101 17.5 24C17.5 27.5899 20.4101 30.5 24 30.5Z"
			fill="white" />
	</svg>
</template>

<script setup lang="ts">
import router from '../router';

const navigateHome = () => {
	router.push({ name: 'home' });
};
</script>
