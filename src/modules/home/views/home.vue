<template>
	<div class="flex flex-col justify-center w-full border items-center">
		<Logo class="size-24" />
		<h1 class="text-3xl font-extrabold text-title mt-4">Pokemon GO Data Viewer</h1>
		<p class="font-semibold w-3/4 text-center mt-3">
			Upload your data package ZIP file below and enter the encryption password to see a beautiful arrangement of your commitment to Niantic
		</p>
		<div class="text-xs text-secondary mt-2 w-1/3 text-center">
			<span>All processing is done on-device, and may take longer on slower devices. </span>
			<span>
				<a class="font-semibold underline" href="about:blank" target="_blank">Learn more</a>
			</span>
		</div>
		<Uploader class="mt-12" />
	</div>
</template>

<script setup lang="ts">
import Uploader from '../components/uploader.vue';
import Logo from '../../../assets/logo.vue';
</script>
