<template>
	<div class="flex flex-col justify-center">
		<h1 class="text-xl font-bold">POGO Data Dump Viewer - Home</h1>
		<p class="mb-8">Upload your Pokemon GO data package below to visualize your unwavering commitment to Niantic.</p>
		<Uploader @change-processing-state="updateLoadingState" />
		<div class="flex justify-center w-full mt-4" v-if="isLoading">
			<p-spinner />
			<p>{{ loadingMessage }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LoadingState } from '../../data/store';
import Uploader from '../components/uploader.vue';

const isLoading = ref<boolean>(false);
const loadingMessage = ref<string>();
const updateLoadingState = (loadingState: LoadingState | undefined, percentage: string, currentFile?: string) => {
	isLoading.value = loadingState !== undefined;

	if (loadingState) {
		loadingMessage.value = `${loadingState} - ${currentFile} - ${percentage}%`;
	}
};
</script>
