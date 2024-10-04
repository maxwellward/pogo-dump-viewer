<template>
	<div class="flex flex-col justify-center">
		<h1 class="text-xl font-bold">POGO Data Dump Viewer - Home</h1>
		<p class="mb-8">Upload your Pokemon GO data package below to visualize your unwavering commitment to Niantic.</p>
		<Uploader />
	</div>
</template>

<script setup lang="ts">
import Uploader from '../components/uploader.vue';
</script>
