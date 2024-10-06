<template>
	<div class="w-full h-1/3 flex justify-center items-start">
		<div v-if="loadingState">
			<p>{{ loadingState }}</p>
			<p>{{ percentage }}</p>
			<p>{{ fileBeingConverted }}</p>
		</div>
		<div v-else-if="passwordStep" class="flex flex-col">
			<p>Enter ZIP Password</p>
			<div class="flex gap-1 items-center mt-2">
				<input type="text" placeholder="Encryption password..." class="border px-2 py-1 rounded-md border-secondary border-2" v-model="password" />
				<button @click="handleUploadedFiles" :disabled="password.length <= 0">
					<component :is="PaperAirplaneIcon" class="size-7 hover:translate-x-0.5 transform ease-in-out duration-150" />
					<p class="sr-only">Submit</p>
				</button>
			</div>
		</div>
		<div
			v-else
			class="border-2 border-dashed border-secondary rounded-xl size-2/3 cursor-pointer flex flex-col justify-center items-center"
			@dragover.prevent="onDragOver"
			@dragleave="onDragLeave"
			@drop.prevent="onDrop"
			@click="onClick"
			:class="{ 'border-black bg-gray-200': isDragOver }">
			<component :is="ArrowUpTrayIcon" class="size-24 mb-2" />
			<p class="text-sm text-secondary">Drag and drop a zip file here, or click to select a file</p>
			<input type="file" accept=".zip" @change="onFileSelect" ref="fileInput" class="hidden" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { unzipFile } from '../../../helpers/unzipFile';
import { convertTsvToJson } from '../../../helpers/convertTsvToJson';
import { LoadingState, useDataStore } from '../../data/store';
import { convertCsvToJson } from '../../../helpers/convertCsvToJson';
import router from '../../../router';
import { ArrowUpTrayIcon } from '@heroicons/vue/20/solid';
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';

const dataStore = useDataStore();
const isDragOver = ref(false);
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const passwordStep = ref(false);
const password = ref('4b8327139fc60c964c52ed74569f328afb76ac8e27d7a5925a5eba847aa576ce');
const loadingState = ref<LoadingState | null>(null);
const percentage = ref<number>(0);
const fileBeingConverted = ref<string>();

const onDragOver = () => {
	isDragOver.value = true;
};

const onDragLeave = () => {
	isDragOver.value = false;
};

const onDrop = (event: DragEvent) => {
	isDragOver.value = false;
	if (event.dataTransfer?.files) {
		checkUploadedFilesValidity(event.dataTransfer.files);
	}
};

const onFileSelect = (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (input.files) {
		checkUploadedFilesValidity(input.files);
	}
};

const onClick = () => {
	fileInput.value?.click();
};

let totalFiles = 0;
let unzippedFiles: File[] = [];

const checkUploadedFilesValidity = (fileList: FileList) => {
	if (fileList.length > 1 || fileList[0].type !== 'application/zip') {
		alert('Please upload only one zip file.');
		return;
	}

	file.value = fileList[0];
	passwordStep.value = true;
};

const handleUploadedFiles = async () => {
	if (!file.value) return;

	loadingState.value = LoadingState.UNZIPPING;
	unzippedFiles = await unzipFile(file.value, password.value);

	let playerJourneyZip = unzippedFiles.find((file) => file.name === 'Player_Journey.zip');

	if (playerJourneyZip) {
		let index = unzippedFiles.indexOf(playerJourneyZip);
		unzippedFiles.splice(index, 1);
		unzippedFiles.push(...(await unzipFile(playerJourneyZip)));
	}

	totalFiles = unzippedFiles.length;
	saveFilesToStore();
};

let completedFiles = 0;

const saveFilesToStore = async () => {
	const processFile = async (file: File, convertFunction: (text: string) => Promise<any>) => {
		const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
		const json = await convertFunction(await file.text());
		dataStore.pushData(fileNameWithoutExtension, json);
		completedFiles++;

		percentage.value = (completedFiles / totalFiles) * 100;
		loadingState.value = LoadingState.CONVERTING;
		fileBeingConverted.value = fileNameWithoutExtension;
	};

	const fileProcessors: { [key: string]: (text: string) => Promise<any> } = {
		'.tsv': convertTsvToJson,
		'.csv': convertCsvToJson,
		'.json': async (text: string) => JSON.parse(text),
	};

	for (const file of unzippedFiles) {
		const extension = Object.keys(fileProcessors).find((ext) => file.name.endsWith(ext));
		if (extension) {
			await processFile(file, fileProcessors[extension]);
		}
	}

	loadingState.value = null;

	router.push({ name: 'data' });
};
</script>
