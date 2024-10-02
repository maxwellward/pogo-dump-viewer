<template>
	<div class="flex flex-col justify-center">
		<h1 class="text-xl font-bold">POGO Data Dump Viewer - Home</h1>
		<p>Upload your Pokemon GO data package below to visualize your unwavering commitment to Niantic.</p>
		<input class="mt-8" type="file" @change="uploadFile($event)" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { convertTsvToJson } from '../../../helpers/convertTsvToJson';
import { useDataStore } from '../../data/store';
import router from '../../../router';

const dataStore = useDataStore();
const uploadedFile = ref<File | null>();

const uploadFile = async (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target && target.files) {
		uploadedFile.value = target.files[0];
	}

	if (uploadedFile.value) dataStore.setData(await convertTsvToJson(uploadedFile.value));

	router.push({ name: 'data' });
};
</script>
