<template>
	<input type="text" placeholder="Encryption password" class="border mb-1" v-model="password" />
	<div
		class="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer"
		@dragover.prevent="onDragOver"
		@dragleave="onDragLeave"
		@drop.prevent="onDrop"
		@click="onClick"
		:class="{ 'border-black bg-gray-200': isDragOver }">
		<p>Drag and drop a zip file here, or click to select a file</p>
		<input type="file" accept=".zip" @change="onFileSelect" ref="fileInput" class="hidden" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { unzipFile } from '../../../helpers/unzipFile';
import { convertTsvToJson } from '../../../helpers/convertTsvToJson';
import { useDataStore } from '../../data/store';
import { convertCsvToJson } from '../../../helpers/convertCsvToJson';

const dataStore = useDataStore();
const isDragOver = ref(false);
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const password = ref();

const onDragOver = () => {
	isDragOver.value = true;
};

const onDragLeave = () => {
	isDragOver.value = false;
};

const onDrop = (event: DragEvent) => {
	isDragOver.value = false;
	if (event.dataTransfer?.files) {
		handleUploadedFiles(event.dataTransfer.files);
	}
};

const onFileSelect = (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (input.files) {
		handleUploadedFiles(input.files);
	}
};

const onClick = () => {
	fileInput.value?.click();
};

let unzippedFiles: File[] = [];
const handleUploadedFiles = async (fileList: FileList) => {
	if (fileList.length > 1 || fileList[0].type !== 'application/zip') {
		alert('Please upload only one zip file.');
		return;
	}
	file.value = fileList[0];

	unzippedFiles = await unzipFile(file.value, password.value);

	let playerJourneyZip = unzippedFiles.find((file) => file.name === 'Player_Journey.zip');

	if (playerJourneyZip) {
		let index = unzippedFiles.indexOf(playerJourneyZip);
		unzippedFiles.splice(index, 1);
		unzippedFiles.push(...(await unzipFile(playerJourneyZip)));
	}

	console.log(unzippedFiles);
	saveFilesToStore();
};

const saveFilesToStore = () => {
	const processFile = async (file: File, convertFunction: (text: string) => Promise<any>) => {
		const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
		const json = await convertFunction(await file.text());
		dataStore.pushData(fileNameWithoutExtension, json);
	};

	const fileProcessors: { [key: string]: (text: string) => Promise<any> } = {
		'.tsv': convertTsvToJson,
		'.csv': convertCsvToJson,
		'.json': async (text: string) => JSON.parse(text),
	};

	unzippedFiles.forEach((file) => {
		const extension = Object.keys(fileProcessors).find((ext) => file.name.endsWith(ext));
		if (extension) {
			processFile(file, fileProcessors[extension]);
		}
	});
};
</script>
