<template>
	<div class="flex flex-col justify-center">
		<h1 class="text-xl font-bold">POGO Data Dump Viewer - Home</h1>
		<p>Upload your Pokemon GO data package below to visualize your unwavering commitment to Niantic.</p>
		<input class="mt-8" type="file" @change="uploadFile($event)" />
		<!-- <button @click="reduceBound">Load previous</button>
	<div v-for="entry in displayedData" :key="entry">
		<p class="mt-12">{{ entry }}</p>
	</div>
	<button @click="raiseBound">Load next</button> -->
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { convertTsvToJson } from '../../../helpers/convertTsvToJson';

const uploadedFile = ref<File | null>();
const fullData = ref();
const displayedData = ref();

// let lowerBound = 0;
// let upperBound = 10;

const uploadFile = async (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target && target.files) {
		uploadedFile.value = target.files[0];
	}

	let data: object[] = [];
	if (uploadedFile.value) data = await convertTsvToJson(uploadedFile.value);

	fullData.value = data;
	displayedData.value = fullData.value.slice(0, 10);
};

// const raiseBound = () => {
// 	lowerBound += 10;
// 	upperBound += 10;
// 	displayedData.value = fullData.value.slice(lowerBound, upperBound);
// };

// const reduceBound = () => {
// 	lowerBound -= 10;
// 	upperBound -= 10;
// 	displayedData.value = fullData.value.slice(lowerBound, upperBound);
// };
</script>
